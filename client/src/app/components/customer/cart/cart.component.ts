import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CartItemsService } from 'src/app/services/CartItemsService';
import { CartsService } from 'src/app/services/CartsService';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public btnSubText: string;
  public searchText: string
  constructor(public cartsService: CartsService, public cartItemsService: CartItemsService) {
    this.btnSubText = "checkout";
    this.searchText = null;
  }
  @Input()
  quantity: number;

  ngOnInit(): void {
    this.initCartBtn();
    this.cartItemsService.totalPrice = 0;
    const cartID = parseInt(sessionStorage.getItem("cartID"));
    const observable = this.cartItemsService.getCartItems(cartID);
    observable.subscribe(response => {
      response.forEach(item => {
        this.cartItemsService.cartItemsMap.set(item.productID, item);
        this.cartItemsService.totalPrice += item.totalPrice;
      });
    }, error => {
      alert('Failed to get cart items ' + JSON.stringify(error.statusText));
    });
  }

  searchInCart() {
    if (this.searchText == "") {
      this.searchText = null
    }
    this.searchText = this.searchText.toLowerCase();
  }

  initCartBtn() {
    if (this.cartsService.isInOrder) {
      this.btnSubText = "back to shop";
    }
    if (!this.cartsService.isInOrder) {
      this.btnSubText = "checkout"
    }
  }

  checkout() {
    this.cartsService.isInOrder = !this.cartsService.isInOrder;
    this.initCartBtn()
  }

  deleteItem(itemID: number, productID: number) {
    const observable = this.cartItemsService.deleteItemFromCart(itemID);
    observable.subscribe(() => {
      const item = this.cartItemsService.cartItemsMap.get(productID);
      this.cartItemsService.totalPrice -= item.totalPrice;
      this.cartItemsService.cartItemsMap.delete(productID);
    }, error => {
      alert('Failed to delete cart items ' + JSON.stringify(error.statusText));
    });
  }

  @ViewChild('myInput', { static: false }) input: ElementRef;

  delete() {
    this.searchText = null
    this.input.nativeElement.focus();
  }

  deleteAllCartItems() {
    const cartID = parseInt(sessionStorage.getItem("cartID"));
    const observable = this.cartsService.deleteAllCartItems(cartID);
    observable.subscribe(() => {
      this.cartItemsService.totalPrice = 0;
      this.cartItemsService.cartItemsMap = new Map();
    }, error => {
      alert('Failed to delete cart contains ' + JSON.stringify(error));
    });
  }


}
