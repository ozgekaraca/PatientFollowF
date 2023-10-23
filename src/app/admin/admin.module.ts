import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { AdminComponent } from './admin/admin.component';



@NgModule({
  declarations: [
    AdminContentComponent,
    AdminComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
