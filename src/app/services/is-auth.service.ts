import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IsAuthService {
  constructor(private authService: AuthenticationService) {}

  isAuth() {
    return (
      this.authService.authenticated ||
      sessionStorage.getItem(environment.sessionKey)
    );
  }
}
