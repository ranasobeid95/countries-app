import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesListComponent } from './countries-list.component';
import { DebugElement } from '@angular/core';

describe('CountriesListComponent', () => {
  let component: CountriesListComponent;
  let fixture: ComponentFixture<CountriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountriesListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('h2 element should contain the country name  ', () => {
    component.listCountries = [];
    const listDe: DebugElement = fixture.debugElement;
    const listEle: HTMLElement = listDe.nativeElement;
    const h3 = listEle.querySelector('.no-data h3');
    expect(h3?.textContent).toBe('No Countries Found');
  });
});
