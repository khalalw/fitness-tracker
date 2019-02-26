import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  template: `
    <div fxLayoutAlign="center center">
      <mat-form-field fxFlex="40%">
        <input
          matInput
          (keyup)="applyFilter($event.target.value)"
          placeholder="Filter"
        />
      </mat-form-field>
    </div>
    <mat-table #table [dataSource]="dataSource" matSort matPaginator>
      <ng-container matColumnDef="date">
        <mat-header-cell *matHeaderCellDef mat-sort-header>
          Date
        </mat-header-cell>
        <mat-cell *matCellDef="let element">{{
          element.date.toDate() | date
        }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="name">
        <mat-header-cell *matHeaderCellDef mat-sort-header>
          Name
        </mat-header-cell>
        <mat-cell *matCellDef="let element">{{ element.name }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="calories">
        <mat-header-cell *matHeaderCellDef mat-sort-header>
          Calories
        </mat-header-cell>
        <mat-cell *matCellDef="let element">
          {{ element.calories | number }}
        </mat-cell>
      </ng-container>
      <ng-container matColumnDef="duration">
        <mat-header-cell *matHeaderCellDef mat-sort-header>
          Duration (s)
        </mat-header-cell>
        <mat-cell *matCellDef="let element">
          {{ element.duration | number }}
        </mat-cell>
      </ng-container>
      <ng-container matColumnDef="state">
        <mat-header-cell *matHeaderCellDef mat-sort-header>
          State
        </mat-header-cell>
        <mat-cell *matCellDef="let element">{{ element.state }}</mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"> </mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
    </mat-table>
    <mat-paginator
      [pageSizeOptions]="[5, 10]"
      showFirstLastButtons
    ></mat-paginator>
  `,
  styleUrls: ['./past-training.component.scss'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  private exChangedSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exChangedSubscription = this.trainingService.pastExercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      }
    );

    this.trainingService.fetchPastExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }
}
