import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { City } from 'src/app/models/City';
import { Product } from 'src/app/models/Product';
import { OrdersService } from 'src/app/services/OrdersService';
import { UserService } from 'src/app/services/UserService';
import { ModalComponent } from '../modal/modal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  public orderFormGroup: FormGroup;
  public cityFormControl: FormControl;
  public streetFormControl: FormControl;
  public creditCardFormControl: FormControl;
  public dateFormControl: FormControl;

  public cities: Array<string>;
  public city: string;
  constructor(private ordersService: OrdersService, private userService: UserService) {
    this.city = "";
    this.cities = Object.values(City);
  }

  @ViewChild('myModal', { static: false }) modal: ElementRef;


  ngOnInit(): void {
    this.getOrdersBusyDays();
    this.cityFormControl = new FormControl("", Validators.required);
    this.streetFormControl = new FormControl("", Validators.required);
    this.dateFormControl = new FormControl("", Validators.required);
    this.creditCardFormControl = new FormControl("", Validators.required);

    // Initializing the from group
    this.orderFormGroup = new FormGroup({
      city: this.cityFormControl,
      street: this.streetFormControl,
      date: this.dateFormControl,
      creditCard: this.creditCardFormControl
    });
  }
  onDblGetCity() {
    let observable = this.userService.getCustomerCityAddress();
    observable.subscribe((response: string) => {
      this.cityFormControl.setValue(response);
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }
  onDblGetStreet() {
    let observable = this.userService.getCustomerStreetAddress();
    observable.subscribe(response => {
      this.streetFormControl.setValue(response);
      console.log(response);
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
    // this.streetFormControl.value = "asdas"
  }
  downloadReciept() {
    const blob = new Blob([this.cityFormControl.value + " "+
      this.streetFormControl.value +
      " "+this.dateFormControl.value +
      " "+this.creditCardFormControl.value], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
    this.close();
  }

  getOrdersBusyDays() {
    let observable = this.ordersService.getOrdersBusyDays();
    observable.subscribe(response => {
      console.log(response);
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
  order() {
    this.modal.nativeElement.style.display = 'block';
    console.log(this.cityFormControl.value,
      this.streetFormControl.value,
      this.dateFormControl.value,
      this.creditCardFormControl.value);
  }
}
