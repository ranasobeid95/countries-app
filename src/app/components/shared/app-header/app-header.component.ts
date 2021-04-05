import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
})
export class AppHeaderComponent implements OnInit {
  isDarkMode: boolean = false;
  isLogin: boolean = false;
  constructor(
    private themeService: ThemeService,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
    this.isLogin = this.auth.authenticated;
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
