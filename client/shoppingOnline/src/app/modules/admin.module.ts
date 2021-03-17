import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../components/admin/admin.component';


const routes: Routes = [
    { 
        path: "admin", component: AdminComponent, children:[
            // { path: "insert", component: InsertComponent },
            // { path: "update", component: UpdateComponent },
            // { path: "delete", component: DeleteComponent },
            // { path: "", redirectTo: "insert", pathMatch: "full" }
        ]
    }
];

@NgModule({
    declarations: [ AdminComponent
        // InsertComponent,
        // UpdateComponent,
        ],
    imports: [
      CommonModule,
      RouterModule.forChild(routes) // Importing the above routes
  ]
  })
export class AdminModule {

 }
