import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthDataProvider} from "../service/auth.data-provider";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthDataProvider) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getToken();

    if (authToken !== null) {
      request = request.clone({headers: request.headers.set('Authorization', `Bearer ${authToken}`)});
    }
    return next.handle(request);
  }
}
