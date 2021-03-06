import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountryDetailsComponent } from './country-details/country-details.component';

import { CountriesRoutingModule } from './countries-routing.module';


@NgModule({
  declarations: [
    CountriesListComponent,
    CountryDetailsComponent, 
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule
  ],
  exports:[
    CountriesListComponent,
    CountryDetailsComponent, 
  ]
})
export class CountriesModule { }
