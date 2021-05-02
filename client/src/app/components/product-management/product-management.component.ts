import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/ProductsService';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  public hintDisplay: boolean

  productManagementForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private breakpointObserver: BreakpointObserver,
    public productsService: ProductsService) {
    this.hintDisplay = false;
  }

  ngOnInit(): void {

    this.productsService.isManagedMod = false;
    this.productManagementForm = this.formBuilder.group({
      productName: ['', Validators.required],
      categoryID: [0, Validators.required],
      price: [0, Validators.required],
      imageURL: ['', Validators.required]
    });
  }

  addNewProduct() {
    this.productsService.isManagedMod = true;
    this.productsService.product = new Product();

  }
  cancel() {
    this.productsService.isManagedMod = false;
    this.productsService.product = new Product();
  }

  submit() {
    if (this.productsService.product.productID == undefined) {
      this.productsService.product = new Product(undefined, this.productManagementForm.get("productName").value,
        this.productManagementForm.get("categoryID").value,
        this.productManagementForm.get("price").value,
        this.productManagementForm.get("imageURL").value);
      let observable = this.productsService.addNewProduct(this.productsService.product);
      observable.subscribe(() => {
        alert("succes");
        this.cancel();
      }, error => {
        alert('Failed to get products ' + JSON.stringify(error));
      });
    }
    this.productsService.product = new Product(this.productsService.product.productID, this.productManagementForm.get("productName").value,
      this.productManagementForm.get("categoryID").value,
      this.productManagementForm.get("price").value,
      this.productManagementForm.get("imageURL").value);
    let observable = this.productsService.updateProduct(this.productsService.product);
    observable.subscribe(() => {
      alert("succes");
      this.cancel();
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }

}
