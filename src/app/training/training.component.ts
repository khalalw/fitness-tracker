import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  template: `
    <mat-tab-group *ngIf="!isTrainingOngoing">
      <mat-tab label="New Exercise">
        <app-new-training></app-new-training>
      </mat-tab>
      <mat-tab label="Past Exercises">
        <app-past-training></app-past-training>
      </mat-tab>
    </mat-tab-group>
    <app-current-training
      *ngIf="isTrainingOngoing"
      (trainingExit)="isTrainingOngoing = false"
    ></app-current-training>
  `,
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  isTrainingOngoing = false;
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        exercise
          ? (this.isTrainingOngoing = true)
          : (this.isTrainingOngoing = false);
      }
    );
  }
}
