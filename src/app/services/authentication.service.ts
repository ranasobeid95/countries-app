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

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  userData: any;
  isLogin: boolean = false;

  constructor(
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore,
    public router: Router,
    public ngZone: NgZone,
    private _snackBar: MatSnackBar
  ) {}

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential) => {
        this.setUserData(newUserCredential.user);
        this.sendVerificationMail(newUserCredential);
        return newUserCredential;
      })
      .catch((error) => {
        this.showError(error);
        return error.massage;
      });
  }

  sendVerificationMail(result: firebase.auth.UserCredential) {
    return result.user?.sendEmailVerification().then(() => {
      console.log(' navigate to verify email address');
    });
  }

  deleteUser() {
    this.afAuth
      .signInWithEmailAndPassword(environment.email, environment.password)
      .then((info) => {
        const user = firebase.auth().currentUser;
        user?.delete();
      });
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.isLogin = true;
        this.ngZone.run(() => {
          this.router.navigate(['countries']);
        });
        return email;
      })
      .catch((error) => {
        this.showError(error);
        return error.massage;
      });
  }

  signOut() {
    return this.afAuth
      .signOut()
      .then(() => {
        this.isLogin = false;
        console.log(' navigate to signIn');
      })
      .catch((error) => this.showError(error));
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  showError(error: { message: string }) {
    this._snackBar.open(error.message, 'End now', {
      duration: 500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
