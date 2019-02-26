import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  template: `
    <mat-nav-list>
      <a *ngIf="!isAuth" mat-list-item routerLink="/signup">
        <mat-icon>account_circle</mat-icon>
        <span class="nav-caption">Sign Up</span>
      </a>
      <a *ngIf="!isAuth" mat-list-item routerLink="/login">
        <mat-icon>input</mat-icon>
        <span class="nav-caption">Log In</span>
      </a>
      <a *ngIf="isAuth" mat-list-item routerLink="/training">
        <mat-icon>rowing</mat-icon>
        <span class="nav-caption">Training</span>
      </a>
      <mat-list-item *ngIf="isAuth">
        <button (click)="onLogout()" mat-button>
          <mat-icon>eject</mat-icon>
          <span class="nav-caption">Log Out</span>
        </button>
      </mat-list-item>
    </mat-nav-list>
  `,
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  authSubcription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubcription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy() {
    if (this.authSubcription) {
      this.authSubcription.unsubscribe();
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
