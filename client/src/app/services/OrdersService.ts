import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderDetails } from '../models/OrderDetails';



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
    public getOrdersBusyDays() {
        return this.http.get("http://localhost:3001/orders");
    }
    public addNewOrder(order: OrderDetails){
        return this.http.post("http://localhost:3001/orders", order);

    }

}