import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { users } from 'src/app/model/dummyData';
import { User } from 'src/app/model/user';
import { DebugElement } from '@angular/core';
import { AuthModule } from '../auth.module';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let signUpSpy: jasmine.Spy;
  let result: User[] = users;

  const authServiceSpy = jasmine.createSpyObj('AuthenticationService', [
    'signUp',
  ]);

  function checkUser(values: User) {
    signUpSpy = authServiceSpy.signUp.and.returnValue(
      new Promise((resolve, reject) => {
        let { email } = values;
        let user = result.find((ele) => ele.email === email);
        if (!user) {
          resolve('Created account successfully');
        } else {
          reject(
            new Error('The email address is already in use by another account.')
          );
        }
      })
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy },
        FormBuilder,
      ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        AuthModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The email address is already used', async () => {
    expect(component.signUpForm.valid).toBeFalsy();

    component.signUpForm.controls['fullName'].setValue('test');
    component.signUpForm.controls['email'].setValue(result[0].email);
    component.signUpForm.controls['password'].setValue('12345678');
    component.signUpForm.controls['confirmPassword'].setValue('12345678');
    expect(component.signUpForm.valid).toBeTruthy();

    checkUser(component.signUpForm.value);
    await component.submit();
    expect(component.isExist).toBeTruthy();

    fixture.detectChanges();

    const signUpDe: DebugElement = fixture.debugElement;
    const signUpEle: HTMLElement = signUpDe.nativeElement;
    const msg = signUpEle.querySelector('.is-not-exist');
    expect(msg).toBeTruthy();
    expect(msg?.textContent?.trim()).toEqual(
      'The email address is already used'
    );
  });

  it('User created successfully', async () => {
    expect(component.signUpForm.valid).toBeFalsy();

    component.signUpForm.controls['fullName'].setValue('test');
    component.signUpForm.controls['email'].setValue('test@test.test');
    component.signUpForm.controls['password'].setValue('12345678');
    component.signUpForm.controls['confirmPassword'].setValue('12345678');
    expect(component.signUpForm.valid).toBeTruthy();

    checkUser(component.signUpForm.value);
    await component.submit();

    expect(component.isExist).toBeFalse();
  });
});
