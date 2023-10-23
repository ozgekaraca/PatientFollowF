import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HeroComponent } from './hero/hero.component';
import { WhyusComponent } from './whyus/whyus.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { BranchComponent } from './branch/branch.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from 'src/core/services/interceptor/jwt.interceptor';
import { ProfileModule } from './profile/profile.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HeroComponent,
    WhyusComponent,
    AboutComponent,
    HomeComponent,
    BranchComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ProfileModule,
    AdminModule,
    RouterModule,
    ToastModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}  //http isteklerini alıp işlemek için
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
