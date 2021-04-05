import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { users } from 'src/app/constants/dummyData';
import { User } from 'src/app/model/user';
import { DebugElement } from '@angular/core';
import { AuthModule } from '../auth.module';
import { SharedModule } from '../../shared/shared.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let signInSpy: jasmine.Spy;

  let result: User[] = users;

  const authServiceSpy = jasmine.createSpyObj('AuthenticationService', [
    'signIn',
  ]);

  function checkUser(values: User) {
    signInSpy = authServiceSpy.signIn.and.returnValue(
      new Promise((resolve, reject) => {
        let { email, password } = values;
        let user = result.find((ele) => ele.email === email);
        if (user) {
          if (user.password === password) {
            resolve('user logged in');
          } else {
            reject(new Error('Password incorrect'));
          }
        } else {
          reject(new Error('no user record'));
        }
      })
    );
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy },
        FormBuilder,
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        AuthModule,
        SharedModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form invalid When empty', () => {
    expect(component.signInForm.valid).toBeFalsy();
  });

  it('Email filed validity', () => {
    let email = component.signInForm.controls['email'];
    expect(email.valid).toBeFalsy();

    let errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue('test');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();
  });

  it('User not exist', async () => {
    expect(component.signInForm.valid).toBeFalsy();
    expect(component.submitted).toBeFalsy();

    component.signInForm.controls['email'].setValue('test@test.test');
    component.signInForm.controls['password'].setValue('123456789');
    expect(component.signInForm.valid).toBeTruthy();
    checkUser(component.signInForm.value);
    await component.submit();

    expect(component.isNotExist).toBeTruthy();

    fixture.detectChanges();

    const signInDe: DebugElement = fixture.debugElement;
    const signInEle: HTMLElement = signInDe.nativeElement;
    const msg = signInEle.querySelector('.is-not-exist');
    expect(msg).toBeTruthy();
    expect(msg?.textContent?.trim()).toEqual(
      'The email you entered isn’t connected to an account'
    );
  });

  it('Enter in correct password', async () => {
    component.signInForm.controls['email'].setValue(users[0].email);
    component.signInForm.controls['password'].setValue('123456789');
    expect(component.signInForm.valid).toBeTruthy();

    checkUser(component.signInForm.value);
    await component.submit();
    expect(component.invalidPassword).toBeTruthy();

    fixture.detectChanges();

    const signInDe: DebugElement = fixture.debugElement;
    const signInEle: HTMLElement = signInDe.nativeElement;
    const msg = signInEle.querySelector('.invalid-password');
    expect(msg).toBeTruthy();
    expect(msg?.textContent?.trim()).toEqual('Enter correct password');
  });

  it('User is logged in', async () => {
    component.signInForm.controls['email'].setValue(users[0].email);
    component.signInForm.controls['password'].setValue(users[0].password);
    expect(component.signInForm.valid).toBeTruthy();

    checkUser(component.signInForm.value);
    await component.submit();
    expect(component.invalidPassword).toBeFalsy();
    expect(component.isNotExist).toBeFalsy();
  });
});
