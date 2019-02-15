import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <section class="signup-form">
      <form
        fxLayout="column"
        fxLayoutAlign="center center"
        fxLayoutGap="10px"
        #f="ngForm"
        (ngSubmit)="onSubmit(f)"
      >
        <mat-form-field>
          <input
            type="email"
            matInput
            placeholder="Email"
            ngModel
            name="email"
            email
            required
            #email="ngModel"
          />
          <mat-error *ngIf="email.hasError('required')"
            >Email must not be blank</mat-error
          >
          <mat-error *ngIf="!email.hasError('required')"
            >E-mail format is invalid</mat-error
          >
        </mat-form-field>
        <mat-form-field>
          <input
            type="password"
            matInput
            placeholder="Password"
            ngModel
            name="password"
            required
            #pw="ngModel"
          />
        </mat-form-field>

        <button
          type="submit"
          mat-raised-button
          color="accent"
          [disabled]="f.invalid"
        >
          Log In
        </button>
      </form>
    </section>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
