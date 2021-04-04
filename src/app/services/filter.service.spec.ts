import { TestBed } from '@angular/core/testing';
import { CountriesService } from './countries.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { dummyCountries } from '../constants/dummyData';
import { of } from 'rxjs';
import { FilterService } from './filter.service';

describe('Countries Service Test', () => {
  let filterService: FilterService;
  let getCountryByRegionSpy: jasmine.Spy;
  const countryServiceSpy = jasmine.createSpyObj('CountriesService', [
    'getCountryByRegion',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FilterService,
        { provide: CountriesService, useValue: countryServiceSpy },
      ],
    });
    filterService = TestBed.get(FilterService);
  });

  beforeEach(() => {
    getCountryByRegionSpy = countryServiceSpy.getCountryByRegion.and.returnValue(
      of([dummyCountries[0]])
    );
  });

  it('filterByNameAndRegion ', () => {
    filterService.filterByNameAndRegion(
      dummyCountries[0].name,
      dummyCountries[0].region
    );
    expect(getCountryByRegionSpy.calls.any()).toBeTrue();
  });
});
