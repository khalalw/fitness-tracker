import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  template: `
    <section class="signup-form">
      <form fxLayout="column" fxLayoutAlign="center center">
        <mat-form-field>
          <input type="email" matInput placeholder="Email" />
        </mat-form-field>
        <mat-form-field>
          <input type="password" matInput placeholder="Password" />
        </mat-form-field>
      </form>
    </section>
  `,
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
