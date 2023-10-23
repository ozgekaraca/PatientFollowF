import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeroComponent } from './hero/hero.component';
import { WhyusComponent } from './whyus/whyus.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { BranchComponent } from './branch/branch.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { ProfileContentComponent } from './profile/profile-content/profile-content.component';
import { PatientCardComponent } from './profile/patient-card/patient-card.component';
import { PrescriptionComponent } from './profile/prescription/prescription.component';
import { AdminComponent } from './admin/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home page
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'hero', component: HeroComponent },
      { path: 'whyus', component: WhyusComponent },
      { path: 'about', component: AboutComponent },
      { path: 'whyus', component: WhyusComponent },
      { path: 'branch', component: BranchComponent },
    ],
  },
  { path:'login', component: LoginComponent },
  { path:'profile', component: ProfileComponent },
  {path:'patient', component: PatientCardComponent},
  {path:'prescription', component: PrescriptionComponent},
  {path:'admin', component: AdminComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
