import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';



@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class CartItemsService {

    public cartItems: Product[];
    constructor(private http: HttpClient) {
    this.cartItems = [];
    }
    public getCartItems(cartID: number): Observable<Product[]> {
        return this.http.get<Product[]>("http://localhost:3001/cart-items/"+cartID);
    }
    public addNewItemToCart(product: Product): Observable<Product> {
        return this.http.post<Product>("http://localhost:3001/cart-items/",product);
    }
}