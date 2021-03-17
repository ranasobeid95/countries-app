import { Injectable } from '@angular/core';
import { CountriesService } from './countries.service';
import { Country } from '../country';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private countriesService: CountriesService) {}

  filterByNameAndRegion(countryName: string, selectedRegion: string) {
    return this.countriesService
      .getCountryByRegion(selectedRegion)
      .pipe(
        map((response: Country[]) =>
          response.filter((result) => result.name.includes(countryName))
        )
      );
  }

  _filterOptions(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();

    return options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
