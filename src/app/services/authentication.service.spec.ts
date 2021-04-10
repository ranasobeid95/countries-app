import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { User } from '../model/user';
import { users } from '../constants/dummyData';
import { routes } from '../constants/route-test-config';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  let signInWithEmailAndPasswordSpy,
    signOutSpy,
    createUserWithEmailAndPasswordSpy: jasmine.Spy;

  let userMock: {
    uid: string;
    email: string;
    displayName?: string;
    emailVerified?: boolean;
  };

  const allUser: User[] = users;

  const angularFireAuthSpy = jasmine.createSpyObj(' AngularFireAuth', [
    'signInWithEmailAndPassword',
    'signOut',
    'createUserWithEmailAndPassword',
  ]);

  function mockSignUpFunctions(values: User) {
    createUserWithEmailAndPasswordSpy = angularFireAuthSpy.createUserWithEmailAndPassword.and.returnValue(
      new Promise((resolve, reject) => {
        let { email, fullName } = values;
        let user = allUser.find((ele) => ele.email === email);
        if (!user) {
          userMock = {
            uid: '3',
            email,
            displayName: fullName,
            emailVerified: false,
          };
          const credentialsMock = {
            user: userMock,
          };
          resolve(credentialsMock);
        } else {
          reject(
            new Error('The email address is already in use by another account.')
          );
        }
      })
    );
  }

  function mockSignInFunctions(values: User) {
    signInWithEmailAndPasswordSpy = angularFireAuthSpy.signInWithEmailAndPassword.and.returnValue(
      new Promise((resolve, reject) => {
        let { email, password } = values;
        let user = allUser.find((ele) => ele.email === email);
        if (user) {
          if (user.password === password) {
            userMock = {
              uid: '1',
              email: user.email,
              displayName: user.fullName,
              emailVerified: false,
            };
            const credentialsMock = {
              user: userMock,
            };
            resolve(credentialsMock);
          } else {
            reject(new Error('The password is invalid'));
          }
        } else {
          reject(
            new Error('The email address is already in use by another account.')
          );
        }
      })
    );
  }

  function mockSignOut(email: string) {
    signOutSpy = angularFireAuthSpy.signOut.and.returnValue(
      new Promise((resolve, reject) => {
        let user = allUser.find((ele) => ele.email === email);

        if (user) {
          resolve('out');
        } else {
          reject(new Error('Logged out failed'));
        }
      })
    );
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        RouterTestingModule.withRoutes(routes),
        BrowserAnimationsModule,
        MaterialModule,
      ],
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthSpy },
        AngularFirestore,
      ],
    });
    let setAuthState_Spy = spyOn(
      AuthenticationService.prototype,
      'setAuthState'
    );

    service = TestBed.inject(AuthenticationService);
  });

  beforeEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Creates new account', async () => {
    let newUser: User = {
      fullName: 'userTest',
      email: 'test@test.com',
      password: 'test123',
    };
    try {
      mockSignUpFunctions(newUser);
      const newUserCredential = await service.signUp(newUser);
      const actualUser = {
        uid: newUserCredential.user?.uid,
        email: newUserCredential.user?.email,
        displayName: newUserCredential.user?.displayName,
        emailVerified: newUserCredential.user?.emailVerified,
      };

      expect(actualUser).toEqual({
        uid: '3',
        email: newUser.email,
        displayName: newUser.fullName,
        emailVerified: false,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it('User is logged in ', async () => {
    let newUser: User = {
      email: allUser[0].email,
      password: allUser[0].password,
    };

    try {
      mockSignInFunctions(newUser);

      const newUserCredential = await service.signIn(newUser);
      const actualUser = {
        uid: newUserCredential.user?.uid,
        email: newUserCredential.user?.email,
        displayName: newUserCredential.user?.displayName,
        emailVerified: newUserCredential.user?.emailVerified,
      };

      expect(service.authState.uid).toEqual(newUserCredential.user?.uid);
      expect(actualUser).toEqual({
        uid: allUser[0].uid,
        email: allUser[0].email,
        displayName: allUser[0].fullName,
        emailVerified: allUser[0].emailVerified,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it('User is login with incorrect password ', async () => {
    let newUser: User = {
      email: allUser[0].email,
      password: 'invalidPassword',
    };

    mockSignInFunctions(newUser);
    service.signIn(newUser).catch((error) => {
      expect(error.message).toEqual('The password is invalid');
    });
  });

  it('User logged out', async () => {
    mockSignOut(allUser[0].email);
    await service.signOut();
    expect(service.authenticated).toBeFalsy();
  });
});
