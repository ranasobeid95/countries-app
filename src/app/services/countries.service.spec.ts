import { TestBed } from '@angular/core/testing';
import { CountriesService } from './countries.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { dummyCountries } from '../constants/dummyData';
import { RouterTestingModule } from '@angular/router/testing';

describe('Countries Service Test', () => {
  let countriesService: CountriesService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [CountriesService],
    });
    countriesService = TestBed.get(CountriesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('Should retrieve all countries from the API via GET getAllCountries', () => {
    countriesService.getAllCountries().subscribe((response) => {
      expect(response.length).toBe(2);
      expect(response).toEqual(dummyCountries);
    });

    const request = httpMock.expectOne(`${countriesService.getUrl()}/all`);
    request.flush(dummyCountries);
  });

  it('Should retrieve country by name from the API via GET getCountryByName', () => {
    countriesService.getCountryByName('afghanistan').subscribe((response) => {
      expect(response.length).toBe(1);
      expect(response).toEqual([dummyCountries[0]]);
    });
    const request = httpMock.expectOne(
      `${countriesService.getUrl()}/name/afghanistan`
    );
    httpMock.expectNone(`${countriesService.getUrl()}/alpha/afghanistan`);
    request.flush([dummyCountries[0]]);
  });

  it('Should retrieve country by Region from the API via GET getCountryByRegion', () => {
    countriesService.getCountryByRegion('Asia').subscribe((response) => {
      expect(response.length).toBe(1);
      expect(response).toEqual([dummyCountries[0]]);
    });
    const request = httpMock.expectOne(
      `${countriesService.getUrl()}/region/Asia`
    );
    request.flush([dummyCountries[0]]);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
