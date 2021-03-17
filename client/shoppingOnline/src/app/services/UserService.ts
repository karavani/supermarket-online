import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { UserRegisterDetails } from '../models/UserRegisterDetails';


@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class UserService {
    
    public userType : string;

    // HttpClient injection (a class variable will be automatically created)
    constructor(private http: HttpClient) {
        // this.http = http;
    }

    public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {

        //  The http request will be sent after the subscribe() method will be called
        return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/login", userLoginDetails);
    }

    public createUser(UserRegisterDetails: UserRegisterDetails): Observable<void> {        
        
        return this.http.post<void>("http://localhost:3001/users", UserRegisterDetails);
    }
}
