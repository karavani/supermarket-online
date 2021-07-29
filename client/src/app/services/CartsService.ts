import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartStatus } from '../models/CartStatus';



@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class CartsService {

    public cartID: number;
    public isInOrder: boolean;

    constructor(private http: HttpClient) {
        this.cartID = 0;
        this.isInOrder = false;
    }
    public creatNewCart(): Observable<number> {
        return this.http.post<number>("http://localhost:4200/carts", null);
    }
    public deleteAllCartItems(cartID: number) {
        return this.http.delete("http://localhost:4200/carts/" + cartID);
    }
    public getCartStatus() {
        return this.http.get<CartStatus>("http://localhost:4200/carts/");
    }

}