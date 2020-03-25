import {Injectable} from '@angular/core';
import {LoginInterface} from "../../api/model/login.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthService} from "../../api/rest/auth.service";
import {map} from "rxjs/operators";
import {UserInterface} from "../../api/model/user.interface";
import {RegisterInterface} from "../../api/model/register.interface";

@Injectable()
export class AuthDataProvider {

  private readonly tokenKey = 'jwt-token';

  private current$ = new BehaviorSubject<UserInterface>(null);
  public current = this.current$.asObservable();

  constructor(private authService: AuthService) {
  }

  public isAuthenticated(): boolean {
    return Boolean(this.getToken());
  }

  public getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  public setToken(token): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public login(request: LoginInterface): Observable<boolean> {
    return this.authService.login(request)
      .pipe(
        map(response => {
          this.setToken(response.token);
          this.setCurrent(response);
          return true;
        })
      )
  }

  public register(request: RegisterInterface): Observable<boolean> {
    return this.authService.register(request)
      .pipe(
        map(response => Boolean(response))
      );
  }

  private setCurrent(response: UserInterface) {
    this.current$.next(response);
  }
}
