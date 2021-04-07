import { Component, OnInit, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ROUTES } from '../../../constants/routes';
import { IsAuthService } from 'src/app/services/is-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
})
export class AppHeaderComponent implements OnInit {
  @Input() isSignInPage: boolean = false;
  isDarkMode: boolean = false;
  isLogin: boolean = false;
  routes = ROUTES;

  constructor(
    private themeService: ThemeService,
    private auth: AuthenticationService,
    private isLogged: IsAuthService
  ) {}

  ngOnInit(): void {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
    this.isLogin = this.isLogged.isAuth() ? true : false;
  }

  toggleDarkMode() {
    this.isDarkMode
      ? this.themeService.update('light-mode')
      : this.themeService.update('dark-mode');
    this.isDarkMode = this.themeService.isDarkMode();
  }

  signOut() {
    this.auth.signOut();
  }
}
