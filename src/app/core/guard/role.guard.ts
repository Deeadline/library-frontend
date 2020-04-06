import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthDataProvider} from "../service/auth.data-provider";
import {UserInterface} from "../../api/model/user.interface";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivateChild {

  constructor(private authDataProvider: AuthDataProvider) {
  }

  static isAllowedToActivate(user: UserInterface, route: ActivatedRouteSnapshot): boolean {
    const userRoles: string[] = user.roles, dataRoles: string[] = route.data.roles;
    const intersection = userRoles.filter(value => dataRoles.includes(value));
    return Boolean(intersection.length);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>(observer => {
      this.authDataProvider.user$.subscribe(user => {
        if (user !== null && !RoleGuard.isAllowedToActivate(user, next)) {
          observer.next(false);
          return;
        }
        return observer.next(true);
      })
    })
  }

}
