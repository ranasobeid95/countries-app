import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
})
export class AppHeaderComponent implements OnInit {
  isDarkMode: boolean = false;
  isLogin: boolean = false;
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  toggleDarkMode() {
    this.isDarkMode
      ? this.themeService.update('light-mode')
      : this.themeService.update('dark-mode');
    this.isDarkMode = this.themeService.isDarkMode();
  }
}
