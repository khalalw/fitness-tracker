import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  template: `
    <mat-nav-list>
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
  `,
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
