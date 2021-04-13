import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public name: string;
  constructor(public usersService: UserService) {

   }
  ngOnInit(): void {
    this.name = this.usersService.userName
  }

}
