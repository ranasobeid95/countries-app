import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CountryDetailsComponent } from './country-details.component';
import { CountriesService } from 'src/app/services/countries.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/tests/activated-route-stub';
import { dummyCountries } from 'src/app/constants/dummyData';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

describe('Country Details Component', () => {
  let component: CountryDetailsComponent;
  let activatedRoute: ActivatedRouteStub;
  let getCountrySpy: jasmine.Spy;
  let fixture: ComponentFixture<CountryDetailsComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const countryServiceSpy = jasmine.createSpyObj('CountriesService', [
    'getCountryByName',
  ]);

  activatedRoute = new ActivatedRouteStub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryDetailsComponent],
      providers: [
        CountriesService,
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: CountriesService, useValue: countryServiceSpy },
        Location,
      ],
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        CommonModule,
        MaterialModule,
        RouterTestingModule,
        SharedModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    getCountrySpy = countryServiceSpy.getCountryByName.and.returnValue(
      of([dummyCountries[0]])
    );
    fixture = TestBed.createComponent(CountryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    component.country = [];
    component.isLoading = false;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show data for invalid params', () => {
    getCountrySpy.calls.reset();
    activatedRoute.setParamMap({ name: '1' });
    expect(getCountrySpy.calls.any()).toBe(false, 'getCountry called');
  });

  it('Navigate To "/page-not-found"', () => {
    getCountrySpy.calls.reset();
    activatedRoute.setParamMap({ name: 'None' });
    component.ngOnInit();
    expect(getCountrySpy.calls.any()).toBe(true, 'getCountry called once');
  });

  it("should display country's by name", () => {
    const expectedCountry = dummyCountries[0];
    activatedRoute.setParamMap({ name: expectedCountry.name });
    let expectedParams: string;
    activatedRoute.paramMap.subscribe(
      (params: any) => {
        expectedParams = params.get('name');
        component.getDetails(expectedParams);
        expect(expectedParams).toBe(dummyCountries[0].name);
        expect(component.country).toEqual([dummyCountries[0]]);
      },
      (err) => {
        expect(component.isLoading).toBeFalse();
      }
    );
  });

  it("should display country's by alpha code", () => {
    const expectedCountry = dummyCountries[0];
    activatedRoute.setParamMap({ name: expectedCountry.alpha3Code });
    let expectedParams: string;
    activatedRoute.paramMap.subscribe((params: any) => {
      expectedParams = params.get('name');
      component.getDetails(expectedParams);
      expect(expectedParams).toBe(dummyCountries[0].alpha3Code);
      expect(component.country).toEqual([dummyCountries[0]]);
    });
  });
});
