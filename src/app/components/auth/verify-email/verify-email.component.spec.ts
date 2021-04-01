import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailComponent } from './verify-email.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;
  let sendVerificationMailSpy: jasmine.Spy;

  const authServiceSpy = jasmine.createSpyObj('AuthenticationService', [
    'sendVerificationMail',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifyEmailComponent],
      providers: [{ provide: AuthenticationService, useValue: authServiceSpy }],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        FormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
