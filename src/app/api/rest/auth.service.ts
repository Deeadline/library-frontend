import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterInterface} from "../model/register.interface";
import {Observable} from "rxjs";
import {LoginInterface} from "../model/login.interface";
import {UserInterface} from "../model/user.interface";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public register(request: RegisterInterface): Observable<string> {
    return this.http.post<string>('/auth/register', request);
  }

  public login(request: LoginInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>('/auth/login', request);
  }
}
