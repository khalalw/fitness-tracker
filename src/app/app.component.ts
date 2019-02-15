import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav role="navigation">
        <app-sidenav-list (click)="sidenav.close()"></app-sidenav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <app-header (sidenavToggle)="sidenav.toggle()"></app-header>
        <main>
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
