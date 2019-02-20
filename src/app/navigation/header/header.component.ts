import { AuthService } from './../../auth/auth.service';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

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
          <li *ngIf="!isAuth"><a routerLink="/signup">Sign Up</a></li>
          <li *ngIf="!isAuth"><a routerLink="/login">Log In</a></li>
          <li *ngIf="isAuth"><a routerLink="/training">Training</a></li>
          <li *ngIf="isAuth"><a>Log Out</a></li>
        </ul>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean;
  authSubcription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubcription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy() {
    this.authSubcription.unsubscribe();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
