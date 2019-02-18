import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  template: `
    <mat-tab-group *ngIf="!isTrainingOngoing">
      <mat-tab label="New Exercise">
        <app-new-training
          (trainingStart)="isTrainingOngoing = true"
        ></app-new-training>
      </mat-tab>
      <mat-tab label="Past Exercises">
        <app-past-training></app-past-training>
      </mat-tab>
    </mat-tab-group>
    <app-current-training *ngIf="isTrainingOngoing"></app-current-training>
  `,
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  isTrainingOngoing = false;
  constructor() {}

  ngOnInit() {}
}
