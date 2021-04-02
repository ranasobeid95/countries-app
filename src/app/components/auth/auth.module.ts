import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, VerifyEmailComponent],
  imports: [CommonModule, MaterialModule, AuthRoutingModule],
  exports: [SignInComponent, SignUpComponent, VerifyEmailComponent],
})
export class AuthModule {}
