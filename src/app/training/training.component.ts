import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  template: `
    <mat-tab-group>
      <mat-tab label="New Exercise">
        <app-new-training></app-new-training>
      </mat-tab>
      <mat-tab label="Past Exercises">
        <app-past-training></app-past-training>
      </mat-tab>
    </mat-tab-group>
  `,
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
