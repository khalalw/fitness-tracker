import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-training',
  template: `
    <section class="new-training" fxLayout fxLayoutAlign="center">
      <mat-card fxFlex="400px" fxFlex.xs="100%">
        <mat-card-title fxLayoutAlign="center">Start a Workout</mat-card-title>
        <mat-card-content fxLayoutAlign="center">
          <mat-form-field>
            <mat-select placeholder="Select an Exercise...">
              <mat-option value="crunches">Crunches</mat-option>
              <mat-option value="burpees">Burpees</mat-option>
              <mat-option value="planks">Planks</mat-option>
              <mat-option value="pullups">Pull Ups</mat-option>
              <mat-option value="pushups">Push Ups</mat-option>
              <mat-option value="legraises">Leg Raises</mat-option>
            </mat-select>
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions fxLayoutAlign="center">
          <button type="submit" mat-button>Start</button>
        </mat-card-actions>
      </mat-card>
    </section>
  `,
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
