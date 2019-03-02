import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  template: `
    <mat-nav-list>
      <a *ngIf="!(isAuth$ | async)" mat-list-item routerLink="/signup">
        <mat-icon>account_circle</mat-icon>
        <span class="nav-caption">Sign Up</span>
      </a>
      <a *ngIf="!(isAuth$ | async)" mat-list-item routerLink="/login">
        <mat-icon>input</mat-icon>
        <span class="nav-caption">Log In</span>
      </a>
      <a *ngIf="(isAuth$ | async)" mat-list-item routerLink="/training">
        <mat-icon>rowing</mat-icon>
        <span class="nav-caption">Training</span>
      </a>
      <mat-list-item *ngIf="(isAuth$ | async)">
        <button (click)="onLogout()" mat-button>
          <mat-icon>eject</mat-icon>
          <span class="nav-caption">Log Out</span>
        </button>
      </mat-list-item>
    </mat-nav-list>
  `,
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  isAuth$: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onLogout() {
    this.authService.logout();
  }
}
