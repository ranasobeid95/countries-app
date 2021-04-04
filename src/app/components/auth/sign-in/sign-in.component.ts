import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  submitted = false;
  isNotExist = false;
  invalidPassword = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });
  }

  get f() {
    return this.signInForm.controls;
  }

  submit() {
    if (!this.signInForm.valid) {
      return;
    }
    this.submitted = true;
    return this.authService
      .signIn(this.signInForm.value)
      .then((res) => {
        this.router.navigate(['/countries']);
      })
      .catch((err) => {
        if (err.message.includes('no user record')) {
          this.isNotExist = true;
        } else {
          this.invalidPassword = true;
        }
      });
  }

  onReset() {
    this.submitted = false;
    this.signInForm.reset();
  }
}
