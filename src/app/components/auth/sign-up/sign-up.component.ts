import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { mustMatch } from '../../../helper/must-match.validator';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  submitted = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group(
      {
        fullName: new FormControl('', {
          validators: [Validators.required],
          updateOn: 'blur',
        }),
        email: new FormControl('', {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur',
        }),
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(8)],
          updateOn: 'blur',
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required],
          updateOn: 'blur',
        }),
      },

      {
        validator: mustMatch('password', 'confirmPassword'),
      }
    );
  }

  get f() {
    return this.signUpForm.controls;
  }

  submit() {
    this.submitted = true;
    if (!this.signUpForm.valid) {
      return;
    }
    this.authService.signUp(this.signUpForm.value).then(() => {
      this.onReset();
      this.router.navigate(['/verify-email']);
    });
  }

  onReset() {
    this.submitted = false;
    this.signUpForm.reset();
  }
}
