import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav role="navigation">
        <mat-nav-list (click)="sidenav.close()">
          <a mat-list-item routerLink="/signup">
            <mat-icon>account_circle</mat-icon>
            <span class="nav-caption">Sign Up</span>
          </a>
          <a mat-list-item routerLink="/login">
            <mat-icon>input</mat-icon>
            <span class="nav-caption">Log In</span>
          </a>
          <a mat-list-item routerLink="/training">
            <mat-icon>rowing</mat-icon>
            <span class="nav-caption">Training</span>
          </a>
          <mat-list-item>
            <button mat-icon-button>
              <mat-icon>eject</mat-icon>
              <span class="nav-caption">Log Out</span>
            </button>
          </mat-list-item>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <div fxHide.gt-xs>
            <button mat-icon-button (click)="sidenav.toggle()">
              <mat-icon>menu</mat-icon>
            </button>
          </div>
          <div><a routerLink="/"> LOGO</a></div>
          <div fxFlex fxLayout fxLayoutAlign="flex-end" fxHide.xs>
            <ul fxLayout fxLayoutGap="10px" class="navigation-items">
              <li><a routerLink="/signup">Sign Up</a></li>
              <li><a routerLink="/login">Log In</a></li>
              <li><a routerLink="/training">Training</a></li>
              <li><a>Log Out</a></li>
            </ul>
          </div>
        </mat-toolbar>
        <main>
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
