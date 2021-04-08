import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.css']
})
export class ModalComponent {

    @Input()
    product: Product
    quantity: number;
    
  @ViewChild('myModal', {static: false}) modal: ElementRef;
  constructor() { 
      this.product = new Product;
      this.quantity = 0;
  }
  addToCart(product: Product, quantity: number){
    console.log(product, quantity)
  }

  open(product: Product) {
    this.product = product;
    console.log(product)
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
}