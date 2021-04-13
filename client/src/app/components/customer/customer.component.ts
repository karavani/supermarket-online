import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/ProductsService';
import { ModalComponent } from '../modal/modal';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public categories: Category[];
  public products: Product[];
  public element:HTMLElement = document.getElementById('allProducts') as HTMLElement;
  constructor(private productsService: ProductsService) {
    this.categories = [];
    this.products = [];

  }
  @ViewChild('allProducts', {static: false}) allProducts: ElementRef;

  addToCart(productID: number) {
    console.log(productID);
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
    this.modal.open(product);
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


  ngOnInit(): void {
    document.getElementById("allProducts").click()
    let observable = this.productsService.getAllCategories();
    observable.subscribe(response => {
      console.log(response);
      this.categories = response;
    }, error => {
      alert('Failed to get categories ' + JSON.stringify(error));
    });
  }

}
