import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav role="navigation">
        <p>I'm the sidenav</p>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <div><button (click)="sidenav.toggle()">Toggle Sidenav</button></div>
          <div>LOGO</div>
          <div>
            <a routerLink="/signup">Sign Up</a>
            <a routerLink="/login">Login</a>
            <a routerLink="/training">Training</a>
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
