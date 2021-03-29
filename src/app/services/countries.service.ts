import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../../app/model/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private countryUrl: string = 'https://restcountries.eu/rest/v2';

  constructor(private http: HttpClient) {}
  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.countryUrl}/all`);
  }

  getCountryByName(name: string): Observable<Country[]> {
    return name.length === 3 || name.length === 2
      ? this.http.get<Country[]>(`${this.countryUrl}/alpha/${name}`)
      : this.http.get<Country[]>(`${this.countryUrl}/name/${name}`);
  }

  getCountryByRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.countryUrl}/region/${region}`);
  }

  getUrl() {
    return this.countryUrl;
  }
}