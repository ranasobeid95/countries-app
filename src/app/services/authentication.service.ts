import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any;
  constructor(
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.saveInLocalStorage(user);
    });
  }

  saveInLocalStorage(user: any) {
    if (user) {
      this.userData = user;
      localStorage.setItem('user', JSON.stringify(this.userData));
    } else {
      localStorage.setItem('user', null!);
      JSON.stringify(localStorage.getItem('user'));
    }
  }

  async createAccount(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log('Create Account', result);
      return !!result;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return !!result;
    } catch (error) {
      return false;
    }
  }
}
