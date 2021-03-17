import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from '../components/customer/customer.component';
import { MainComponent } from '../components/main/main.component';
import { RegisterComponent } from '../components/register/register.component';

const routes: Routes = [{ path: "home", component: MainComponent },
{ path: "home", component: MainComponent },
{ path: "register", component: RegisterComponent },
{ path: "login", component: MainComponent },
{ path: "customer", component: CustomerComponent },
{ path: "admin", loadChildren: "./admin.module#AdminModule"},
{ path: "", redirectTo: "home", pathMatch: "full" }, // pathMatch = התאמת המחרוזת הריקה לכלל הנתיב
  // { path: "**", component: Page404Component } // Page not Found (Must be the last one!!!)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
