import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/City';
import { StateService } from 'src/app/services/StateService';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-register-part2',
  templateUrl: './register-part2.component.html',
  styleUrls: ['./register-part2.component.css']
})
export class RegisterPart2Component implements OnInit {


  private usersService: UserService;
  public city: string;
  public regiterFormGroup: FormGroup;
  public addressFormControl: FormControl;
  public firstNameFormControl: FormControl;
  public lastNameFormControl: FormControl;
  public cities: Array<string>;


  constructor(public stateService: StateService, usersService: UserService, private router: Router) {
    this.usersService = usersService;
    this.city = null;
    this.cities = Object.values(City);
  }

  onItemChange(value: string) {
    this.city = value;
  }
  register(): void {
    this.stateService.registerStatus();
    this.stateService.newUser.city = this.city;
    this.stateService.newUser.address = this.addressFormControl.value
    this.stateService.newUser.firstName = this.firstNameFormControl.value
    this.stateService.newUser.lastName = this.lastNameFormControl.value
    const observable = this.usersService.createUser(this.stateService.newUser);
    observable.subscribe(() => {
      alert("yayy! user created succesfully");
      this.router.navigate(["/home"]);
    }, serverErrorResponse => { // Reaching here means that the server had failed
      // serverErrorResponse is the object returned from the ExceptionsHandler
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);
    });
  }
  ngOnInit(): void {
    // Initializing form controls with validators
    this.addressFormControl = new FormControl("", Validators.required);
    this.firstNameFormControl = new FormControl("", Validators.required);
    this.lastNameFormControl = new FormControl("", Validators.required);


    // Initializing the from group
    this.regiterFormGroup = new FormGroup({
      address: this.addressFormControl,
      firstName: this.firstNameFormControl,
      lastName: this.lastNameFormControl
    });
  }
}
