import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from '../components/layout/layout.component';
import { MainComponent } from '../components/main/main.component';
import { HeaderComponent } from '../components/header/header.component';
import { MenuComponent } from '../components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AboutComponent } from '../components/about/about.component';
import { GeneralInfoComponent } from '../components/general-info/general-info.component';
import { RegisterComponent } from '../components/register/register.component';
import { RegisterPart1Component } from '../components/register-part1/register-part1.component';
import { RegisterPart2Component } from '../components/register-part2/register-part2.component';
import { CustomerComponent } from '../components/customer/customer.component';
import { AdminModule } from './admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationInterceptor } from '../interceptors/AuthenticationInterceptor';
import { ProductsService } from '../services/ProductsService';
import { UserService } from '../services/UserService';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { ModalComponent } from '../components/modal/modal';

@NgModule({
  declarations: [
    LayoutComponent,
    MainComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    AboutComponent,
    GeneralInfoComponent,
    RegisterComponent,
    RegisterPart1Component,
    RegisterPart2Component,
    CustomerComponent,
    ProductCardComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AdminModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule, RouterModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [UserService
    , ProductsService
    , { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
