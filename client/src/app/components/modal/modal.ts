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

  @ViewChild('myModal', { static: false }) modal: ElementRef;
  constructor(private cartItemsService: CartItemsService) {
    this.product = new Product;
    this.quantity = 1;
  }
  addToCart(product: Product, quantity: number) {
    console.log(product, quantity)
    this.product.quantity = quantity;
    this.product.totalPrice = this.product.price * quantity;
    this.product.cartID = parseInt(sessionStorage.getItem("cartID"));
    console.log(this.product);
    
    let observable = this.cartItemsService.addNewItemToCart(this.product);
    observable.subscribe(() => {
      this.cartItemsService.cartItems.push(this.product);
    }, error => {
      alert('Failed to add new item ' + JSON.stringify(error));
    });
    this.close();
  }

  open(product: Product) {
    this.product = product;
    console.log(product)
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
    this.quantity = 1;
  }
}