import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';

import { TrainingService } from './../training/training.service';
import { AuthData } from './auth-data.model';
import { UIService } from '../shared/ui.service';
// import { auth } from 'firebase/app';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuth = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar,
    private uiService: UIService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuth = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.isAuth = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.trainingService.cancelSubs();
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.uiService.loadingStateChanged.next(true);
      })
      .catch(err => {
        this.uiService.openSnackBar(err.message, null, 3000);
        this.uiService.loadingStateChanged.next(true);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(err => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.openSnackBar(err.message, null, 3000);
      });
  }

  isAuthenticated() {
    return this.isAuth;
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
