import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let signInFormSpy: jasmine.Spy;

  const authServiceSpy = jasmine.createSpyObj('AuthenticationService', [
    'signIn',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy },
        FormBuilder,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
