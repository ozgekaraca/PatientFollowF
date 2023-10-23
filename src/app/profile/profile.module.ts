import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { PatientCardComponent } from './patient-card/patient-card.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProfileComponent,
    PatientCardComponent,
    PrescriptionComponent,
    ProfileContentComponent,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ]
})
export class ProfileModule { }
