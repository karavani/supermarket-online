import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { Product } from '../models/Product';



@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class ProductsService {


    constructor(private http: HttpClient) {
    }
    public getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>("http://localhost:3001/products/categories");
    }
    public getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>("http://localhost:3001/products");
    }
    public getAllProductsByCategory(categoryID: number): Observable<Product[]> {
        return this.http.get<Product[]>("http://localhost:3001/products/" + categoryID);
    }

    public getAllProductsNumber() {
        return this.http.get("http://localhost:3001/products/number");
    }

}
