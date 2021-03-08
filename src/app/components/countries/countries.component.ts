import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries.service';
import { Country } from './country';

@Component({
  selector: 'all-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  countries: Country[] = [];
  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countriesService.getAllCountries().subscribe((response) => {
      this.countries = response;
    });
  }
}
