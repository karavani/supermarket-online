import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class ProductsService {


    constructor(private http: HttpClient) {
    }
    public getAllProductsNumber() {

        return this.http.get("http://localhost:3001/products/number");
    }

}
