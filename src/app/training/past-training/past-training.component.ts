import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-past-training',
  template: `
    <mat-table [dataSource]="dataSource">
      <ng-container matColumnDef="date">
        <mat-header-cell *matHeaderCellDef>Date</mat-header-cell>
        <mat-cell *matCellDef="let element">{{ element.date | date }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="name">
        <mat-header-cell *matHeaderCellDef>Name</mat-header-cell>
        <mat-cell *matCellDef="let element">{{ element.name }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="calories">
        <mat-header-cell *matHeaderCellDef>Calories</mat-header-cell>
        <mat-cell *matCellDef="let element">
          {{ element.calories | number }}
        </mat-cell>
      </ng-container>
      <ng-container matColumnDef="duration">
        <mat-header-cell *matHeaderCellDef>Duration (s)</mat-header-cell>
        <mat-cell *matCellDef="let element">
          {{ element.duration | number }}
        </mat-cell>
      </ng-container>
      <ng-container matColumnDef="state">
        <mat-header-cell *matHeaderCellDef>State</mat-header-cell>
        <mat-cell *matCellDef="let element">{{ element.state }}</mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"> </mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
    </mat-table>
  `,
  styleUrls: ['./past-training.component.scss'],
})
export class PastTrainingComponent implements OnInit {
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.dataSource.data = [...this.trainingService.getPastExercises()];
  }
}
