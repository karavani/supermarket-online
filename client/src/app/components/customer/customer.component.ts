import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CartItemsService } from 'src/app/services/CartItemsService';
import { CartsService } from 'src/app/services/CartsService';
import { ProductsService } from 'src/app/services/ProductsService';
import { ModalComponent } from '../modal/modal';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public isInOrder: boolean;
  public categories: Category[];
  public products: Product[];
  constructor(private productsService: ProductsService, public cartItemsService: CartItemsService,
    public cartsService: CartsService) {
    this.categories = [];
    this.products = [];
    this.isInOrder = false;
  }

  getAllProducts() {
    let observable = this.productsService.getAllProducts();
    observable.subscribe(response => {
      console.log(response);
      this.products = response;
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }
  @ViewChild('modal', { static: false }) modal: ModalComponent

  openModal(product: Product) {
    let productID = product.productID
    console.log(productID);
    if (this.cartItemsService.cartItemsMap.has(productID)) {
      alert("product already in cart")
      this.modal.btnSubText = "update quantity";
      return this.modal.open(this.cartItemsService.cartItemsMap.get(productID));
    }
    else {
      this.modal.open(product);
    }
  }
  getProductsByCategory(categoryID: number) {
    let observable = this.productsService.getAllProductsByCategory(categoryID);
    observable.subscribe(response => {
      console.log(response);
      this.products = response;
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }
  getAllCategories(){
    let observable = this.productsService.getAllCategories();
    observable.subscribe(response => {
      console.log(response);
      this.categories = response;
    }, error => {
      alert('Failed to get categories ' + JSON.stringify(error));
    });
  }
  


  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }
}