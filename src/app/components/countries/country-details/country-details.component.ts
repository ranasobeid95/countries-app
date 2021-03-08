import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CountriesService } from '../countries.service';
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
    private route: ActivatedRoute
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
}
