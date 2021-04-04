import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../model/user';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from '@angular/material/snack-bar';
import firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { ROUTES } from '../constants/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  userCredential!: firebase.auth.UserCredential;
  userData: any;
  isLogin: boolean = false;
  authState: any = null;
  setEmail!: string;

  constructor(
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore,
    public router: Router,
    public ngZone: NgZone,
    private _snackBar: MatSnackBar
  ) {
    this.setAuthState();
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  setAuthState() {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
      this.isLogin = this.authenticated;
    });
  }

  signUp(user: User) {
    const { password, email, fullName } = user;
    this.setEmail = email;
    return this.afAuth
      .createUserWithEmailAndPassword(email, password!)
      .then((newUserCredential) => {
        this.setUserData({ ...newUserCredential.user, displayName: fullName });
        this.setUserCredential(newUserCredential);
        return newUserCredential;
      })
      .catch((error) => {
        throw Error(error.message);
      });
  }

  setUserCredential(userCredential: firebase.auth.UserCredential) {
    this.userCredential = userCredential;
  }
  getUserCredential() {
    return this.userCredential;
  }
  sendVerificationMail() {
    const actionCodeSettings = {
      url: 'https://where-in-the-world-dee98.web.app/sign-in',
      handleCodeInApp: true,
    };
    return this.afAuth
      .sendSignInLinkToEmail(this.setEmail, actionCodeSettings)
      .then((res) => {
        this.router.navigate([`/${ROUTES.VERIFY_EMAIL}`]);
      })
      .catch((error) => {
        throw Error(error.message);
      });
  }

  signIn(user: User) {
    const { password, email } = user;

    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return this.afAuth.signInWithEmailAndPassword(email, password!);
      })
      .then((userCredential) => {
        return userCredential;
      })
      .catch((error) => {
        throw Error(error.message);
      });
  }

  signOut() {
    return this.afAuth
      .signOut()
      .then((res) => {
        this.authState = null;
        this.isLogin = this.authenticated;
        this.router.navigate([`/${ROUTES.SIGN_IN}`]);
      })
      .catch((error) => {
        throw Error(error.message);
      });
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      fullName: user.displayName,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  showError(error: { message: string }) {
    this._snackBar.open(error.message, 'End now', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    throw Error(error.message);
  }
}
