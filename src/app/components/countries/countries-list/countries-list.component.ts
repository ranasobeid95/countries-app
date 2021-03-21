import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../../../model/country';

@Component({
  selector: 'countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css'],
})
export class CountriesListComponent implements OnInit {
  @Input() listCountries: Country[] = [];
  constructor() {}

  ngOnInit(): void {}
}
