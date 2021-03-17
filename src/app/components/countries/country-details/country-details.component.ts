import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../services/countries.service';
import { Location } from '@angular/common';

import { Country } from '../country';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent implements OnInit {
  country: Country[] = [];
  isLoading: boolean = false;
  countryName!: string;
  mode: ProgressSpinnerMode = 'indeterminate';
  languages!: string;
  currencies!: string;

  constructor(
    private countriesService: CountriesService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe(
      (params: any) => {
        this.countryName = params.get('name');
        this.countryName.length === 1
          ? this.router.navigate(['/page-not-found'])
          : this.getDetails(this.countryName);
      },
      (err) => (this.isLoading = false),
      () => (this.isLoading = false)
    );
  }

  getDetails(name: string) {
    this.isLoading = true;
    this.country = [];
    this.countriesService.getCountryByName(name).subscribe(
      (response: Country[]) => {
        Array.isArray(response)
          ? (this.country = response)
          : this.country.push(response);
        this.languages = this.country[0].languages
          .map((lang) => lang.name)
          .join(', ');
        this.currencies = this.country[0].currencies
          .map((currency) => currency.code)
          .join(', ');
      },
      (err) => {
        this.country = [];
        this.isLoading = false;
        this.router.navigate(['/page-not-found']);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  backToLastPage() {
    this.isLoading = true;
    this._location.back();
  }
}
