import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Exercise } from '../exercise.model';
import { TrainingService } from './../training.service';

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
            <mat-form-field>
              <mat-select
                placeholder="Select an Exercise..."
                ngModel
                name="exercise"
                required
              >
                <mat-option
                  *ngFor="let exercise of (exercises | async)"
                  [value]="exercise.id"
                >
                  {{ exercise.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </mat-card-content>
          <mat-card-actions fxLayoutAlign="center">
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
export class NewTrainingComponent implements OnInit {
  exercises: Observable<Exercise[]>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.exercises = this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            const d: any = doc.payload.doc;
            return {
              id: d.id,
              name: d.data().name,
              duration: d.data().duration,
              calories: d.data().calories,
            };
          });
        })
      );
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
