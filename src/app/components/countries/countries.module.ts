import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { CountryCardComponent } from './country-card/country-card.component';

@NgModule({
  declarations: [
    CountriesListComponent,
    CountryDetailsComponent,
    CountryCardComponent, 
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
