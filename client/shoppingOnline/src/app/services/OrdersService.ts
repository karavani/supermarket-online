import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class OrdersService {


    constructor(private http: HttpClient) {
    }
    public getAllOrdersNumber() {

        return this.http.get("http://localhost:3001/orders/number");
    }
}