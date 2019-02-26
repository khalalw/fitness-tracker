import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from './../training.service';
import { UIService } from 'src/app/shared/ui.service';

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
            <mat-form-field *ngIf="!isLoading">
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
            <mat-spinner *ngIf="isLoading"></mat-spinner>
          </mat-card-content>
          <mat-card-actions fxLayoutAlign="center" *ngIf="!isLoading">
            <button
              type="submit"
              mat-button
              [disabled]="f.invalid"
              color="warn"
            >
              Start
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

  isLoading = false;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      }
    );
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
