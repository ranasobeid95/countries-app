import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { ROUTES } from '../../constants/routes';

const routes: Routes = [
  { path: ROUTES.SIGN_OUT, redirectTo: 'sign-in', pathMatch: 'full' },
  {
    path: ROUTES.SIGN_IN,
    component: SignInComponent,
  },
  {
    path: ROUTES.SIGN_UP,
    component: SignUpComponent,
  },
  {
    path: ROUTES.VERIFY_EMAIL,
    component: VerifyEmailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
