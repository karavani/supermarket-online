import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartItemsService } from 'src/app/services/CartItemsService';
import { CartsService } from 'src/app/services/CartsService';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private cartsService: CartsService, public cartItemsService: CartItemsService) {

  }
@Input()
quantity: number;

  ngOnInit(): void {
    let cartID = parseInt(sessionStorage.getItem("cartID"));
    let observable = this.cartItemsService.getCartItems(cartID);
    observable.subscribe(response => {
      response.forEach(item => {
        this.cartItemsService.cartItemsMap.set(item.productID, item);
      });
    }, error => {
      alert('Failed to get categories ' + JSON.stringify(error));
    });
  }


  deleteItem(itemID: number, productID: number) {
    let observable = this.cartItemsService.deleteItemFromCart(itemID);
    console.log(itemID);
    observable.subscribe(() => {
      this.cartItemsService.cartItemsMap.delete(productID);
    }, error => {
      alert('Failed to get categories ' + JSON.stringify(error));
    });
  }

  deleteAllCartItems() {
    let cartID = parseInt(sessionStorage.getItem("cartID"));
    let observable = this.cartsService.deleteAllCartItems(cartID);
    observable.subscribe(() => {
      this.cartItemsService.cartItemsMap = new Map();
    }, error => {
      alert('Failed to delete cart contains ' + JSON.stringify(error));
    });
  }


}
