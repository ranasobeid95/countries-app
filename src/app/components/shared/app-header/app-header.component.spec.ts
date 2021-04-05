import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHeaderComponent } from './app-header.component';
import { ThemeService } from 'src/app/services/theme.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppHeaderComponent],
      imports: [CommonModule, MaterialModule, RouterTestingModule],
      providers: [ThemeService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleDarkMode should toggle isDarkMode', () => {
    expect(component.isDarkMode).toBe(false, 'Light at first');
    component.toggleDarkMode();
    expect(component.isDarkMode).toBe(true, 'Dark after click');
    component.toggleDarkMode();
    expect(component.isDarkMode).toBe(false, 'Light after second click');
  });
});
