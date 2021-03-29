import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { async } from 'rxjs';

const generateEmailAndPassword = () => {
  const randomString = () =>
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const email = `${randomString()}@${randomString()}.test`;
  const password = randomString();

  return { email, password };
};

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [AngularFireAuth],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Creates new account', async () => {
    const { email, password } = generateEmailAndPassword();
    const result = await service.createAccount(email, password);
    expect(result).toEqual(true);
  });

  it('Login', async () => {
    const { email, password } = generateEmailAndPassword();
    const result = await service.createAccount(email, password);
    expect(result).toEqual(true);
    const loginResult = await service.login(email, password);
    expect(loginResult).toEqual(true);
  });

  it('Invalid email and password', async () => {
    const loginResult = await service.login(
      'invalid@email.invalid',
      'password'
    );
    expect(loginResult).toEqual(false);
  });
});
