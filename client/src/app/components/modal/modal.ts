import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartItemsService } from 'src/app/services/CartItemsService';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.css']
})
export class ModalComponent {

  @Input()
  product: Product
  quantity: number;
  btnSubText: string;

  @ViewChild('myModal', { static: false }) modal: ElementRef;
  constructor(private cartItemsService: CartItemsService) {
    this.product = new Product;
    this.quantity = 1;
  }
  addToCart(quantity: number) {
    if (this.cartItemsService.cartItemsMap.has(this.product.productID)) {
      this.updateCartItem(this.product, quantity)
      this.btnSubText = "add to cart";
    }
    else {
      this.product.quantity = quantity;
      this.product.totalPrice = this.product.price * quantity;
      this.product.cartID = parseInt(sessionStorage.getItem("cartID"));

      let observable = this.cartItemsService.addNewItemToCart(this.product);
      observable.subscribe((response) => {
        let itemID = response;
        console.log(itemID)
        this.product.itemID = +itemID
        this.cartItemsService.cartItemsMap.set(this.product.productID, this.product);
      }, error => {
        alert('Failed to add new item ' + JSON.stringify(error));
      });
    }
    this.cartItemsService.totalPrice += this.product.totalPrice
    this.close();
  }

  updateCartItem(item: Product, quantity: number) {
    item.quantity = quantity;
    let observable = this.cartItemsService.updateCartItem(item);
    observable.subscribe(() => {
      let cartItem = this.cartItemsService.cartItemsMap.get(item.productID);
      this.cartItemsService.totalPrice -= cartItem.totalPrice
      cartItem.quantity = quantity;
      cartItem.totalPrice = cartItem.price * quantity;
      this.cartItemsService.cartItemsMap.set(cartItem.productID, cartItem);
    }, (error: any) => {
      alert('Failed to update cart item ' + JSON.stringify(error));
    });
  }

  open(product: Product) {
    this.product = product;
    console.log(product)
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
    this.btnSubText = "add to cart";
    this.quantity = 1;
  }
}