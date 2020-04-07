import {Injectable} from '@angular/core';
import {LoginInterface} from "../../api/model/login.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthService} from "../../api/rest/auth.service";
import {map, mergeMap} from "rxjs/operators";
import {UserInterface} from "../../api/model/user.interface";
import {RegisterInterface} from "../../api/model/register.interface";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class AuthDataProvider {

  private readonly tokenKey = 'jwt-token';

  private userSource = new BehaviorSubject<UserInterface>(null);
  public user$: Observable<UserInterface>;

  constructor(private authService: AuthService) {
    this.user$ = this.userSource.asObservable();
    this.user$.subscribe();
  }

  public isAuthenticated(): boolean {
    return Boolean(this.getToken());
  }

  public getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  public getRole(): string {
    const token = this.getToken();
    if (token) {
      const helper = new JwtHelperService();
      const decodeToken = helper.decodeToken(token);
      return JSON.parse(JSON.stringify(decodeToken)).role;
    }
    return null;
  }

  public get currentUsername(): string {
    const token = this.getToken();
    if (token) {
      const helper = new JwtHelperService();
      const decodeToken = helper.decodeToken(token);
      return JSON.parse(JSON.stringify(decodeToken)).username;
    }
    return null;
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
        // auto-login after registration
        mergeMap(response => this.login({email: request.email, password: request.password}))
      );
  }

  private setCurrent(response: UserInterface) {
    this.userSource.next(response);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    location.reload();
  }
}
