import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()

//JwtInterceptor adında bir sınıf tanımlar ve bu sınıf, HttpInterceptor arayüzünü uygular.
//HttpInterceptor, HTTP isteklerini ele almak ve düzenlemek için kullanılan bir Angular arayüzüdür.
export class JwtInterceptor implements HttpInterceptor {
  //JwtInterceptor sınıfı, HTTP isteklerini ele alarak oturum yönetimi ve belirteç işlemlerini gerçekleştirmek için AuthService adındaki bir servisi kullanır.
  //Bu işlem, oturum belirtecini kontrol etmek ve gerektiğinde yenilemek gibi görevleri içerebilir.
  constructor(private authService: AuthService) {}

  //prettier-ignore
  //intercept fonksiyonu, HttpInterceptor arayüzünün bir parçasıdır ve HTTP isteklerini ele almak için kullanılır.
  intercept(
    request: HttpRequest<any>,  // Gelen HTTP isteği
    next: HttpHandler
  ): Observable<HttpEvent<any>> { //HTTP isteği sonucunu temsil eden Observable

    //Bu satır, gelen isteğin URL'sinin, belirli bir environment.api_url ile başlayıp başlamadığını ve aynı zamanda "RefreshToken" kelimesini içerip içermediğini kontrol eder. 
    //Bu, yalnızca belirli bir URL desenine sahip isteklerin işleneceğini belirtir.
    if (request.url.startsWith(environment.api_url) && !request.url.includes('RefreshToken')
    ) {
      //Oturum belirtecinin son kullanma tarihini alır.
      //Oturum belirtecinin son kullanma tarihi, sessionStorage içinde saklanır ve Date.parse ile bir tarihe dönüştürülür.
        const expiration = Date.parse(JSON.parse(<string>sessionStorage.getItem('token_expiration')));

      if (expiration != null && Date.now() > expiration) { //Oturum belirtecinin son kullanma tarihi (expiration) dolmuşsa ve hâlâ geçerliyse bu bloğa girilir.
        this.authService.refreshToken().then((result) => { //Oturum belirteci yeniden alınmaya çalışılır. refreshToken fonksiyonu bir Promise döndürür.

          if (result) {  // Eğer refreshToken başarılı olduysa (result true ise) bu bloğa girilir.

            request = this.setRequest(request); // İstek, oturum belirteci eklenmiş haliyle güncellenir.
          } else {  // Eğer refreshToken başarısız olduysa (result false ise) bu bloğa girilir.
            this.authService.logOut(); // Kullanıcı oturumdan çıkarılır (logOut fonksiyonu kullanılır).
          }
        });
      }

      request = this.setRequest(request); //Bu satır, request değişkenini this.setRequest(request) fonksiyonunun dönüş değeri ile günceller. 
    }
    
    return next.handle(request); //İşlenmiş HTTP isteğini sonraki adıma (interceptor'a veya HTTP isteğinin nihai hedefine) iletmek için kullanılır.
  }

  //prettier-ignore
  // Verilen HTTP isteğini klonlayarak orijinal isteği değiştirmemek ve yeni bir istek oluşturmak için kullanıyoruz.
  private setRequest(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({  // Oluşturulan isteği düzenlemek için kullanılan bir HttpRequest metodu.
      setHeaders: { // İsteğin başlıklarını düzenlemek için kullanılır.

      // Authorization başlığı, oturum belirteci ile kimlik doğrulamasını sunucuya sağlayan önemli bir başlık.
      // Bearer yöntemiyle sunucuya oturum belirteci (token) ile kimlik doğrulama sağlanır.
      // sessionStorage.getItem('access_token') ile oturum belirteci alınır ve Authorization başlığına eklenir.
        Authorization: `Bearer ${JSON.parse(<string>sessionStorage.getItem('access_token'))}`,
      },
    });
  }
}
