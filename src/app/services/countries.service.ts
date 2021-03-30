import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Country } from '../../app/model/country';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private countryUrl: string = 'https://restcountries.eu/rest/v2';

  constructor(private http: HttpClient) {}
  getAllCountries(): Observable<Country[]> {
    return this.GetFromApi(`${this.countryUrl}/all`, 'Get all Countries');
  }

  getCountryByName(name: string): Observable<Country[]> {
    return name.length === 3 || name.length === 2
      ? this.GetFromApi(
          `${this.countryUrl}/alpha/${name}`,
          'Get country by alpha code'
        )
      : this.GetFromApi(
          `${this.countryUrl}/name/${name}`,
          'Get country by country name'
        );
  }

  getCountryByRegion(region: string): Observable<Country[]> {
    return this.GetFromApi(
      `${this.countryUrl}/region/${region}`,
      'Get countries by region'
    );
  }

  getUrl() {
    return this.countryUrl;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  private GetFromApi(url: string, operation: string) {
    return this.http
      .get<Country[]>(url)
      .pipe(catchError(this.handleError<Country[]>(operation, [])));
  }
}
