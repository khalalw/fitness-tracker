import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from './../training.service';
import { UIService } from 'src/app/shared/ui.service';
import * as fromRoot from '../../app.reducer';

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
            <mat-form-field *ngIf="!(isLoading$ | async) && exercises">
              <mat-select
                placeholder="Select an Exercise..."
                ngModel
                name="exercise"
                required
              >
                <mat-option
                  *ngFor="let exercise of exercises"
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
              *ngIf="exercises"
            >
              Start
            </button>
            <button
              mat-button
              *ngIf="!exercises"
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
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  private exerciseSubscription: Subscription;
  private loadingSubscription: Subscription;

  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      }
    );

    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
