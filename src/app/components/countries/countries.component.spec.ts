import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountriesComponent } from './countries.component';
import { CountriesService } from '../../services/countries.service';
import { FilterService } from 'src/app/services/filter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CountriesRoutingModule } from './countries-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { dummyCountries } from 'src/app/model/dummyData';
import { CountryCardComponent } from './country-card/country-card.component';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Countries Component', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let getCountryByNameSpy: jasmine.Spy;
  let getAllCountriesSpy: jasmine.Spy;
  let getCountryByRegionSpy: jasmine.Spy;
  let filterByNameAndRegionSpy: jasmine.Spy;
  const countryServiceSpy = jasmine.createSpyObj('CountriesService', [
    'getCountryByName',
    'getAllCountries',
    'getCountryByRegion',
  ]);

  const filterServiceSpy = jasmine.createSpyObj('FilterService', [
    'filterByNameAndRegion',
    '_filterOptions',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CountriesComponent,
        CountriesListComponent,
        CountryCardComponent,
      ],
      providers: [
        { provide: CountriesService, useValue: countryServiceSpy },
        { provide: FilterService, useValue: filterServiceSpy },
      ],
      imports: [
        HttpClientTestingModule,
        CountriesRoutingModule,
        RouterTestingModule,
        MaterialModule,
        FormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    getCountryByNameSpy = countryServiceSpy.getCountryByName.and.returnValue(
      of([dummyCountries[0]])
    );
    getAllCountriesSpy = countryServiceSpy.getAllCountries.and.returnValue(
      of(dummyCountries)
    );
    getCountryByRegionSpy = countryServiceSpy.getCountryByRegion.and.returnValue(
      of([dummyCountries[0]])
    );
    filterByNameAndRegionSpy = filterServiceSpy.filterByNameAndRegion.and.returnValue(
      of([dummyCountries[0]])
    );
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display All getAllCountries', () => {
    expect(component.isLoading).toBeFalse();
    fixture.detectChanges();
    expect(component.countries).toEqual(dummyCountries);
    component.getAllCountries();
    expect(getAllCountriesSpy.calls.any()).toBe(
      true,
      'getAllCountries is called'
    );
  });
  it('getAllCountries is called', () => {
    expect(component.isLoading).toBeFalse();
    component.getAllCountries();
    expect(getAllCountriesSpy.calls.any()).toBe(true);
    expect(component.countries).toEqual(dummyCountries);
  });

  it('onSearch', () => {
    component.selectedRegion = 'All';
    let event = { target: { value: '' } };
    component.onSearch(event);
    expect(getAllCountriesSpy.calls.any()).toBe(true);
    expect(component.countryName).toEqual('');

    let event2 = { target: { value: dummyCountries[0].name }, key: 'Enter' };
    component.onSearch(event2);
    expect(getAllCountriesSpy.calls.any()).toBe(true);
  });

  it('getCountryByNameAndRegion by Country name', () => {
    component.selectedRegion = 'All';
    let event = { target: { value: dummyCountries[0].name } };
    component.getCountryByNameAndRegion(event);
    expect(getCountryByNameSpy.calls.any()).toBe(true);
    expect(component.countryName).toEqual(dummyCountries[0].name);
  });

  it('getCountryByNameAndRegion by Country region', () => {
    component.countryName = dummyCountries[0].name;
    component.getCountryByNameAndRegion('Asia');
    expect(filterByNameAndRegionSpy.calls.any()).toBe(true);
    expect(component.selectedRegion).toEqual(dummyCountries[0].region);
  });

  it('updateCountryName by Country region', () => {
    component.countries = dummyCountries;
    component.selectedRegion = 'All';
    component.countryName = dummyCountries[1].name;
    component.updateCountryName(dummyCountries[0].name);
    expect(getCountryByNameSpy.calls.any()).toBe(true);
    expect(component.countries).toEqual([dummyCountries[0]]);
  });

  it('updateCountryName no  Country found', () => {
    component.countries = dummyCountries;
    component.countryName = dummyCountries[1].name;
    component.selectedRegion = 'Europe';
    component.updateCountryName(dummyCountries[0].name);
    expect(getCountryByNameSpy.calls.any()).toBe(true);
    expect(component.countries).toEqual([]);
  });
});
