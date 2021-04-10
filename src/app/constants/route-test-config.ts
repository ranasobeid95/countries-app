import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../components/shared/page-not-found/page-not-found.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/countries',
    pathMatch: 'full',
  },
  {
    path: 'countries',
    loadChildren: () =>
      import('../../app/components/countries/countries.module').then(
        (m) => m.CountriesModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../components/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];
