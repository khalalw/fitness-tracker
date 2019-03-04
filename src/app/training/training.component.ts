import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  template: `
    <mat-tab-group *ngIf="!(isTrainingOngoing$ | async)">
      <mat-tab label="New Exercise">
        <app-new-training></app-new-training>
      </mat-tab>
      <mat-tab label="Past Exercises">
        <app-past-training></app-past-training>
      </mat-tab>
    </mat-tab-group>
    <app-current-training
      *ngIf="(isTrainingOngoing$ | async)"
    ></app-current-training>
  `,
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  isTrainingOngoing$: Observable<boolean>;

  constructor(private store: Store<fromTraining.State>) {}

  ngOnInit() {
    this.isTrainingOngoing$ = this.store.select(
      fromTraining.getIsTrainingOngoing
    );
  }
}
