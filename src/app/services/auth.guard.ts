import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from '@angular/material/snack-bar';
import { ROUTES } from '../constants/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.authenticated) {
      this.auth.isLogin = this.auth.authenticated;
      return true;
    }
    this._snackBar.open(
      `Access Denied, Login is Required to Access This Page!`,
      'End now',
      {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      }
    );
    this.router.navigate([`/${ROUTES.SIGN_IN}`]);

    return false;
  }
}
