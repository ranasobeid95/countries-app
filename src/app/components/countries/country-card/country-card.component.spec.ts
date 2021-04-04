import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCardComponent } from './country-card.component';
import { dummyCountries } from '../../../constants/dummyData';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('CountryCardComponent', () => {
  let component: CountryCardComponent;
  let fixture: ComponentFixture<CountryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryCardComponent],
      imports: [CommonModule, MaterialModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCardComponent);
    component = fixture.componentInstance;
    component.country = dummyCountries[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Set country', () => {
    expect(component.country).toBeDefined();
  });

  it('h2 element should contain the country name  ', () => {
    const cardDe: DebugElement = fixture.debugElement;
    const cardEle: HTMLElement = cardDe.nativeElement;

    const h2 = cardEle.querySelector('.card-country-name');
    expect(h2?.textContent).toBe(component.country.name);
  });

  it('should find the <h2> with fixture.debugElement.query(By.css)', () => {
    const cardDe: DebugElement = fixture.debugElement;
    const h2De = cardDe.query(By.css('h2'));
    const h2: HTMLElement = h2De.nativeElement;
    expect(h2?.textContent).toBe(component.country.name);
  });
});
