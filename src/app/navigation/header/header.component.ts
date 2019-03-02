import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <div fxHide.gt-xs>
        <button mat-icon-button (click)="onToggleSidenav()">
          <mat-icon>menu</mat-icon>
        </button>
      </div>
      <div>
        <a routerLink="/">Motiv8</a>
      </div>
      <div fxFlex fxLayout fxLayoutAlign="flex-end" fxHide.xs>
        <ul fxLayout fxLayoutGap="10px" class="navigation-items">
          <li *ngIf="!(isAuth$ | async)">
            <a routerLink="/signup">Sign Up</a>
          </li>
          <li *ngIf="!(isAuth$ | async)"><a routerLink="/login">Log In</a></li>
          <li *ngIf="(isAuth$ | async)">
            <a routerLink="/training">Training</a>
          </li>
          <li *ngIf="(isAuth$ | async)"><a (click)="onLogout()">Log Out</a></li>
        </ul>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
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

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
