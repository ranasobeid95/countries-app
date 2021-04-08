import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { FormControl } from '@angular/forms';

import { Country } from '../../model/country';
import { Observable, Subject } from 'rxjs';
import {
  map,
  startWith,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

import { REGIONS } from '../../constants/regions';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'all-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  countries: Country[] = [];
  myControl = new FormControl();
  regionsControl = new FormControl();
  options: string[] = [];
  filteredOptions?: Observable<string[]>;
  countryName: string = '';
  selectedRegion: string = 'All';
  regions: string[] = REGIONS;
  err?: string;
  isLoading: boolean = false;
  mode: ProgressSpinnerMode = 'indeterminate';
  userSearchUpdate = new Subject<string>();

  constructor(
    private countriesService: CountriesService,
    private filterService: FilterService
  ) {}

  onSearch(event: any) {
    let searchText: string | undefined = event.target.value.trim();
    this.userSearchUpdate.next(searchText);
  }
  ngOnInit(): void {
    this.userSearchUpdate
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        if (value?.length > 3) {
          this.getCountryByNameAndRegion(value);
        } else {
          if (this.selectedRegion !== 'All') {
            this.getCountryByNameAndRegion(this.selectedRegion);
          }
        }
      });

    this.getAllCountries();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  getAllCountries() {
    this.options = [];
    this.isLoading = true;
    this.countriesService.getAllCountries().subscribe(
      (response) => {
        this.countries = response;
        response.map((ele: any) => {
          this.options.push(ele.name);
        });
      },
      (err) => {
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  getCountryByNameAndRegion(event: any) {
    this.isLoading = true;
    let isRegion = this.regions.filter((ele) => ele === event);
    this.err = '';
    isRegion.length !== 0
      ? (this.selectedRegion = event)
      : (this.countryName = event);
    console.log(`this.countryName`, this.countryName);
    this.selectedRegion === 'All'
      ? this.countryName
        ? this.countriesService.getCountryByName(this.countryName).subscribe(
            (response) => {
              console.log(`response`, response);
              this.countries = response;
            },
            (err) => {
              this.countries = [];
              this.isLoading = false;
              this.err = 'Enter valid name !!';
            },
            () => {
              this.isLoading = false;
            }
          )
        : this.getAllCountries()
      : this._responseFilter(this.countryName, this.selectedRegion);
  }

  updateCountryName(country: string) {
    this.isLoading = true;
    if (this.countryName) {
      this.countriesService.getCountryByName(country).subscribe(
        (response) => {
          if (this.selectedRegion === 'All') {
            this.countries = response;
          } else {
            this.countries = response.filter((element) => {
              return element.region === this.selectedRegion;
            });
          }
        },
        (err) => {
          this.isLoading = false;
          this.countries = [];
          this.err = 'Enter valid name !!';
        },
        () => {
          this.isLoading = false;
        }
      );
    }
  }

  _responseFilter(countryName: string, region: string) {
    this.filterService.filterByNameAndRegion(countryName, region).subscribe(
      (response: Country[]) => {
        this.countries = response;
      },
      (err) => {
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
