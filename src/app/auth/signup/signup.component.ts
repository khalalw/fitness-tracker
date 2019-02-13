import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
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
        <mat-form-field hintLabel="should be at least 8 characters">
          <input
            type="password"
            matInput
            placeholder="Password"
            ngModel
            name="password"
            required
            minlength="8"
            #pw="ngModel"
          />
          <mat-hint align="end" *ngIf="pw.value?.length < 8">
            {{ pw.value?.length }} / 8
          </mat-hint>
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            placeholder="Birthdate"
            [matDatepicker]="picker"
            [max]="maxDate"
            ngModel
            name="birthdate"
            required
          />
          <mat-datepicker-toggle
            matSuffix
            [for]="picker"
          ></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        <mat-checkbox ngModel name="agree" required>
          I agree to the Terms and Conditions
        </mat-checkbox>
        <button
          type="submit"
          mat-raised-button
          color="accent"
          [disabled]="f.invalid"
        >
          Sign Up
        </button>
      </form>
    </section>
  `,
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  constructor() {}

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 16);
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
