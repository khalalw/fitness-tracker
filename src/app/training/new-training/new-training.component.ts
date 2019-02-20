import { TrainingService } from './../training.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  template: `
    <section class="new-training" fxLayout fxLayoutAlign="center">
      <mat-card fxFlex="400px" fxFlex.xs="100%">
        <mat-card-title fxLayoutAlign="center">Start a Workout</mat-card-title>
        <mat-card-content fxLayoutAlign="center">
          <mat-form-field>
            <mat-select placeholder="Select an Exercise...">
              <mat-option
                *ngFor="let exercise of exercises"
                [value]="exercise.id"
                >{{ exercise.name }}</mat-option
              >
            </mat-select>
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions fxLayoutAlign="center">
          <button type="submit" mat-button (click)="onStartTraining()">
            Start
          </button>
        </mat-card-actions>
      </mat-card>
    </section>
  `,
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[];

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exercises = this.trainingService.getExercises();
  }

  onStartTraining() {
    this.trainingStart.emit();
  }
}
