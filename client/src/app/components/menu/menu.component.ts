import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartItemsService } from 'src/app/services/CartItemsService';
import { CartsService } from 'src/app/services/CartsService';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {



  constructor(private cartsService: CartsService, public cartItemsService: CartItemsService) {
  }

  ngOnInit(): void {
    let cartID = sessionStorage.getItem("cartID");
    let observable = this.cartItemsService.getCartItems(parseInt(cartID));
    observable.subscribe(response => {
      this.cartItemsService.cartItems = response;
    }, error => {
      alert('Failed to get categories ' + JSON.stringify(error));
    });
  }

}
