import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { CountriesComponent } from './countries.component';
import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  { path: '', component: CountriesComponent },
  {
    path: ':name',
    component: CountryDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
