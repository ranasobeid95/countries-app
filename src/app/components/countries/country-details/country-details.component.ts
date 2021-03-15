import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../countries.service';
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
  mode: ProgressSpinnerMode = 'indeterminate';

  constructor(
    private countriesService: CountriesService,
    private route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit(): void {
    console.log(1);
    this.isLoading = true;

    this.route.params.subscribe(({ name }) => {
      this.getDetails(name);
    });
  }

  getDetails(name: string) {
    this.isLoading = true;
    this.countriesService.getCountryByName(name).subscribe(
      (response: Country[]) => {
        this.country = response;
      },
      (err) => {
        this.country = [];
        this.isLoading = false;
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
