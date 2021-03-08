import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { CountriesComponent } from './countries.component';

const routes: Routes = [
  { path: '', component: CountriesComponent },
  { path: ':name', component: CountryDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
