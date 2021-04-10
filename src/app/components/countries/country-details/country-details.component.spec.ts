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
    sessionStorage.setItem(`${environment.sessionKey}`, '1');
    fixture.detectChanges();
  });

  afterAll(() => {
    component.country = [];
    component.isLoading = false;
    sessionStorage.removeItem(`${environment.sessionKey}`);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(
    waitForAsync(() => {
      const expectedCountry = dummyCountries[0].name;
      activatedRoute.setParamMap({ name: expectedCountry });
    })
  );
  it("should display country's by name", () => {
    let expectedParams: string;
    activatedRoute.paramMap.subscribe(
      (params: any) => {
        expectedParams = params.get('name');
        expect(expectedParams).toBe(dummyCountries[0].name);
        expect(component.country[0].name).toEqual(dummyCountries[0].name);
      },
      (err) => {
        expect(component.isLoading).toBeFalse();
      }
    );
  });
});
