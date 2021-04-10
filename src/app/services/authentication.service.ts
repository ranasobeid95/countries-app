import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  userCredential!: firebase.auth.UserCredential;
  userData: any;
  authState: any = null;
  setEmail!: string;

  constructor(
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.setAuthState();
  }
  get authenticated(): boolean {
    return this.authState !== null;
  }

  setAuthState() {
    return this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  signUp(user: User) {
    const { password, email, fullName } = user;
    this.setEmail = email;
    return this.afAuth
      .createUserWithEmailAndPassword(email, password!)
      .then((newUserCredential) => {
        this.setUserData({ ...newUserCredential.user, displayName: fullName });
        return newUserCredential;
      })
      .catch((error) => {
        throw Error(error.message);
      });
  }

  sendVerificationMail() {
    const actionCodeSettings = {
      url: 'https://where-in-the-world-dee98.web.app/sign-in',
      handleCodeInApp: true,
    };
    return this.afAuth
      .sendSignInLinkToEmail(this.setEmail, actionCodeSettings)
      .then((res) => {
        this.router.navigate(['auth/verify-email']);
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
        this.authState = userCredential.user;
        return userCredential;
      })
      .catch((error) => {
        throw Error(error.message);
      });
  }

  SignInWithGoogle() {
    return this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCredential) => {
        this.authState = userCredential.user;
        this.setUserData(userCredential.user);
        this.router.navigate(['countries']);
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
        this.router.navigate(['auth/sign-in']);
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
