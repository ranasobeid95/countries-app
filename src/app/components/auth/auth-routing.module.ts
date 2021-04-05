import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { ROUTES } from '../../constants/routes';
import { NegateUserLoggedInGuard } from 'src/app/services/negate-user-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: `/${ROUTES.AUTH}/${ROUTES.SIGN_IN}`,
    pathMatch: 'full',
  },
  {
    path: ROUTES.SIGN_OUT,
    redirectTo: `${ROUTES.AUTH}/${ROUTES.SIGN_IN}`,
    pathMatch: 'full',
  },
  {
    path: ROUTES.SIGN_IN,
    component: SignInComponent,
    canActivate: [NegateUserLoggedInGuard],
  },
  {
    path: ROUTES.SIGN_UP,
    component: SignUpComponent,
    canActivate: [NegateUserLoggedInGuard],
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
