import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CountryDetailsComponent } from './country-details.component';
import { CountriesService } from 'src/app/services/countries.service';
import { FilterService } from 'src/app/services/filter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/tests/activated-route-stub';
import { dummyCountries } from 'src/app/model/dummyData';

describe('Country Details Component', () => {
  let component: CountryDetailsComponent;
  let activatedRoute: ActivatedRouteStub;
  let fixture: ComponentFixture<CountryDetailsComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub({ name: 'afghanistan' });
    activatedRoute.setParamMap({ name: 'afghanistan' });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryDetailsComponent],
      providers: [
        CountriesService,
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useValue: routerSpy },
        FilterService,
        Location,
      ],
      imports: [HttpClientTestingModule, MaterialModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    "should display country's by name",
    waitForAsync(() => {
      const expectedCountry = dummyCountries[0];
      activatedRoute.setParamMap({ name: expectedCountry.name });
    })
  );
});
