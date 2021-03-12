import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../countries.service';
import { Location } from '@angular/common';

import { Country } from '../country';

@Component({
  selector: 'country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent implements OnInit {
  country: Country[] = [];

  constructor(
    private countriesService: CountriesService,
    private route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ name }) => {
      this.getDetails(name);
    });
  }

  getDetails(name: string) {
    this.countriesService
      .getCountryByName(name)
      .subscribe((response: Country[]) => {
        this.country = response;
      });
  }

  backToLastPage() {
    this._location.back();
  }
}
