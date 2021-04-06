import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Where in the World?';
  constructor(private titleService: Title, private themeService: ThemeService) {
    this.themeService.initTheme();
    this.titleService.setTitle(this.title);
  }
}
