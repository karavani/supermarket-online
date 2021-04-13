import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { CartsService } from 'src/app/services/CartsService';
import { UserService } from 'src/app/services/UserService';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginFormGroup: FormGroup;
    public userNameFormControl: FormControl;
    public passwordFormControl: FormControl;
    public userLoginDetails: UserLoginDetails;
    private usersService: UserService;

    private cartsService: CartsService;
    public openCartMessage: string;
    public startShoppingButtonValue: string;
    public isUserLoggedIn: boolean;
    public userFirstName: string;

    // The router parameter is an example to a short writing of a member + it's assignment
    // private router: Router EQUIVALENT TO the following 3: 
    // 1. Member definition
    // 2. Parameter definition
    // 3. this.router = router
    constructor(usersService: UserService, private router: Router, cartsService: CartsService) {
        this.userLoginDetails = new UserLoginDetails();
        this.usersService = usersService;
        this.cartsService = cartsService;
        this.openCartMessage = "";
        this.startShoppingButtonValue = "";
        this.isUserLoggedIn = false;
    }
    public login(): void {

        this.userLoginDetails.email = this.userNameFormControl.value;
        this.userLoginDetails.password = this.passwordFormControl.value;

        // Creating an observable object
        // It looks like an http request had been issued BUT IT DIDN'T
        const observable = this.usersService.login(this.userLoginDetails);

        // The method subscribe() ussues an http request to the server
        // successfulServerRequestData
        observable.subscribe(successfulServerRequestData => {
            console.log(successfulServerRequestData);

            sessionStorage.setItem("token", successfulServerRequestData.token + "");
            this.usersService.userType = successfulServerRequestData.userType;

            if (successfulServerRequestData.userType == "customer") {
                this.isUserLoggedIn = true;
                this.usersService.userName = successfulServerRequestData.name;
                if (successfulServerRequestData.cart == null) {
                    this.openCartMessage = "welcome " + successfulServerRequestData.name + "!";
                    this.startShoppingButtonValue = "start shopping";
                    return
                }
                if (successfulServerRequestData.cart.status != 1) {
                    this.openCartMessage = "you have an open cart from date: " + successfulServerRequestData.cart.dateOfCreation;
                    this.startShoppingButtonValue = "resume shopping";
                    this.cartsService.cartID = successfulServerRequestData.cart.cartID;
                    sessionStorage.setItem("cartID", successfulServerRequestData.cart.cartID.toString());
                    return
                }
                else {
                    this.openCartMessage = "your last purchase was in: " + successfulServerRequestData.cart.dateOfCreation;
                    this.startShoppingButtonValue = "start shopping";
                    return
                }
            }

            if (successfulServerRequestData.userType == "admin") {
                this.router.navigate(["/admin"]);
            }

        }, serverErrorResponse => { // Reaching here means that the server had failed
            // serverErrorResponse is the object returned from the ExceptionsHandler
            alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);
        });

    }

    public startShopping() {
        if (this.startShoppingButtonValue == "start shopping") {
            let observable = this.cartsService.creatNewCart();
            observable.subscribe(response => {
                this.cartsService.cartID = response;
                sessionStorage.setItem("cartID", response.toString());
            }, error => {
                alert('Failed to get products ' + JSON.stringify(error));
            });
        }
        console.log(this.cartsService.cartID);
        this.router.navigate(["/customer"]);
    }
    ngOnInit() {
        // Initializing form controls with validators
        //this.userName = new FormControl("Default value doesn't make sense here", [Validators.required, Validators.pattern("^[A-Z]+")]);
        this.userNameFormControl = new FormControl("", [Validators.required, Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]);
        this.passwordFormControl = new FormControl("", Validators.required);

        // Initializing the from group
        this.loginFormGroup = new FormGroup({
            userName: this.userNameFormControl,
            password: this.passwordFormControl
        });
    }

}
