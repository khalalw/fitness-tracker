import { Component, OnInit, EventEmitter, Output } from '@angular/core';

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
          <li><a routerLink="/signup">Sign Up</a></li>
          <li><a routerLink="/login">Log In</a></li>
          <li><a routerLink="/training">Training</a></li>
          <li><a>Log Out</a></li>
        </ul>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
