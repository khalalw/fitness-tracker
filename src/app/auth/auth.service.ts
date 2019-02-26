import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuth = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        console.log(res);
        this.authSuccess();
      })
      .catch(err => {
        console.log(err);
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        console.log(res);
        this.authSuccess();
      })
      .catch(err => {
        console.log(err);
      });
  }

  isAuthenticated() {
    return this.isAuth;
  }

  logout() {
    this.isAuth = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  private authSuccess() {
    this.isAuth = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
