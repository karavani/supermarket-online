import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class CartsService {

    public cartID: number;

    constructor(private http: HttpClient) {
        this.cartID = 0;
    }
    public creatNewCart(): Observable<number> {
        return this.http.post<number>("http://localhost:3001/carts", null);
    }

}