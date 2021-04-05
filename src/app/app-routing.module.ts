import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { AuthGuard } from './services/auth.guard';
import { ROUTES } from './constants/routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: `/${ROUTES.COUNTRIES}`,
    pathMatch: 'full',
  },
  {
    path: ROUTES.COUNTRIES,
    loadChildren: () =>
      import('./components/countries/countries.module').then(
        (m) => m.CountriesModule
      ),
  },
  {
    path: ROUTES.AUTH,
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
