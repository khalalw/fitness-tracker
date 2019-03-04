import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from './../training.service';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  template: `
    <section class="new-training" fxLayout fxLayoutAlign="center">
      <form (ngSubmit)="onStartTraining(f)" #f="ngForm">
        <mat-card fxFlex="400px" fxFlex.xs="100%">
          <mat-card-title fxLayoutAlign="center">
            Start a Workout
          </mat-card-title>

          <mat-card-content fxLayoutAlign="center">
            <mat-form-field
              *ngIf="(!(isLoading$ | async) && exercises$ | async)"
            >
              <mat-select
                placeholder="Select an Exercise..."
                ngModel
                name="exercise"
                required
              >
                <mat-option
                  *ngFor="let exercise of (exercises$ | async)"
                  [value]="exercise.id"
                >
                  {{ exercise.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>
            <mat-spinner *ngIf="(isLoading$ | async)"></mat-spinner>
          </mat-card-content>
          <mat-card-actions
            fxLayoutAlign="center"
            *ngIf="!(isLoading$ | async)"
          >
            <button
              type="submit"
              mat-button
              [disabled]="f.invalid"
              color="primary"
              *ngIf="(exercises$ | async)"
            >
              Start
            </button>
            <button
              mat-button
              *ngIf="!(exercises$ | async)"
              type="button"
              (click)="fetchExercises()"
              color="warn"
            >
              Fetch again
            </button>
          </mat-card-actions>
        </mat-card>
      </form>
    </section>
  `,
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
