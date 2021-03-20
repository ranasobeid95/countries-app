import { TestBed } from '@angular/core/testing';
import { CountriesService } from './countries.service';
import { Country } from '../country';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('Countries Service Test', () => {
  let countriesService: CountriesService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesService],
    });
    countriesService = TestBed.get(CountriesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  const dummyCountries: Country[] = [
    {
      name: 'Afghanistan',
      capital: 'Kabul',
      region: 'Asia',
      subregion: 'Southern Asia',
      population: 27657145,
      flag: 'https://restcountries.eu/data/afg.svg',
      borders: ['IRN', 'PAK', 'TKM', 'UZB', 'TJK', 'CHN'],
      nativeName: 'افغانستان',
      topLevelDomain: '.af',
      currencies: [
        {
          code: 'AFN',
        },
      ],
      languages: [
        {
          name: 'Pashto',
          nativeName: 'پښتو',
        },
        {
          name: 'Uzbek',
          nativeName: 'Oʻzbek',
        },
        {
          name: 'Turkmen',
          nativeName: 'Türkmen',
        },
      ],
    },
    {
      name: 'Albania',
      topLevelDomain: '.al',

      capital: 'Tirana',

      region: 'Europe',
      subregion: 'Southern Europe',
      population: 2886026,

      borders: ['MNE', 'GRC', 'MKD', 'KOS'],
      nativeName: 'Shqipëria',
      currencies: [
        {
          code: 'ALL',
        },
      ],
      languages: [
        {
          name: 'Albanian',
          nativeName: 'Shqip',
        },
      ],

      flag: 'https://restcountries.eu/data/alb.svg',
    },
  ];

  it('Should retreive all countries from the API via GET getAllCountries', () => {
    countriesService.getAllCountries().subscribe((response) => {
      expect(response.length).toBe(2);
      expect(response).toEqual(dummyCountries);
    });

    const request = httpMock.expectOne(`${countriesService.getUrl()}/all`);
    request.flush(dummyCountries);
  });

  it('Should retreive country by name from the API via GET getCountryByName', () => {
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

  afterEach(() => {
    httpMock.verify();
  });
});
