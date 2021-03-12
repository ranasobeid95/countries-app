import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries.service';
import { FormControl } from '@angular/forms';

import { Country } from './country';
import { Observable, throwError } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { REGIONS } from './regions';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from '@angular/material/snack-bar';

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
  selectedRegion?: string = 'All';
  regions: string[] = REGIONS;
  err?: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private countriesService: CountriesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllCountries();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  getAllCountries() {
    this.countriesService
      .getAllCountries()
      .pipe(
        catchError((err: any) => {
          this._snackBar.open('Server Error !!', 'End now', {
            duration: 100000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          return throwError(err);
        })
      )
      .subscribe((response) => {
        this.countries = response;
        response.map((ele: any) => {
          this.options.push(ele.name);
        });
      });
  }
  getCountryByName(countryName: any) {
    this.err = '';
    if (!this.selectedRegion) {
      if (countryName.target.value) {
        this.countriesService
          .getCountryByName(countryName.target.value)
          .subscribe(
            (response) => {
              this.countries = response;
            },
            (err) => {
              this.countries = [];
              this.err = 'Enter valid name !!';
            }
          );
      } else {
        this.getAllCountries();
      }
    } else {
      this.countriesService
        .getCountryByRegion(this.selectedRegion)
        .subscribe((response) => {
          let filtterResponse = response.filter((element) => {
            return element.name.includes(this.countryName);
          });
          this.countries = filtterResponse;
        });
    }
  }

  getCountriesByRegion(region: string) {
    if (!this.countryName) {
      console.log(region);
      if (region === 'All') {
        this.getAllCountries();
      } else {
        this.countriesService
          .getCountryByRegion(region)
          .subscribe((response) => {
            this.countries = response;
          });
      }
    } else {
      this.countriesService.getCountryByRegion(region).subscribe((response) => {
        let filtterResponse = response.filter((element) => {
          return element.name.includes(this.countryName);
        });
        this.countries = filtterResponse;
      });
    }
  }
  updateCountryName(country: string) {
    this.countriesService.getCountryByName(country).subscribe(
      (response) => {
        this.countries = response;
      },
      (err) => {
        this.countries = [];
        this.err = 'Enter valid name !!';
      }
    );
  }
}
