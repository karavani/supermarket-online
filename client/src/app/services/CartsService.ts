import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



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
        return this.http.post<number>("http://localhost:3001/carts", null);
    }
    public deleteAllCartItems(cartID: number) {
        return this.http.delete("http://localhost:3001/carts/" + cartID);
    }

}