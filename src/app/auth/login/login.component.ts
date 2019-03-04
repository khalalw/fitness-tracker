import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  template: `
    <form
      fxLayout="column"
      fxLayoutAlign="center center"
      fxLayoutGap="10px"
      [formGroup]="loginForm"
      (ngSubmit)="onSubmit()"
    >
      <mat-form-field>
        <input
          type="email"
          matInput
          placeholder="Email"
          formControlName="email"
        />
        <mat-hint>Please enter email address</mat-hint>
        <mat-error>Invalid or missing email address</mat-error>
      </mat-form-field>
      <mat-form-field>
        <input
          type="password"
          matInput
          placeholder="Password"
          formControlName="password"
        />
        <mat-hint>Please enter your password</mat-hint>
        <mat-error>Password is required.</mat-error>
      </mat-form-field>
      <button
        type="submit"
        mat-raised-button
        [disabled]="loginForm.invalid"
        color="accent"
        *ngIf="!(isLoading$ | async)"
      >
        Sign In
      </button>
      <mat-spinner *ngIf="(isLoading$ | async)"></mat-spinner>
    </form>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }
}
