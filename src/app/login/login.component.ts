import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoginRequest } from 'src/core/models/request/login-request-model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ResponseStatus } from 'src/core/models/response/base-response-model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent {
  public loginRequest: LoginRequest = <LoginRequest>{};

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private messageService: MessageService
  ) {}

  async login() {
    let status = await this.authService.login(this.loginRequest);

    if (status == ResponseStatus.Ok) {
      const userType = this.authService.getUserType(); 
      if (userType === 0) {
        await this.router.navigate(['/admin']); // Admin ise 
      } else if (userType === 1) {
        await this.router.navigate(['/profile']); // Doktor ise 
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Kullanıcı türü belirlenemedi!',
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Hata',
        detail: 'Kullanıcı adı veya şifre hatalı!',
      });
      this.loginRequest.password = '';
    }
  }
}