import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  template: `
    <section
      class="current-training"
      fxLayout="column"
      fxLayoutAlign="center center"
    >
      <mat-progress-spinner
        mode="determinate"
        [value]="progress"
      ></mat-progress-spinner>
      <h1>{{ progress }} %</h1>
      <p>Keep pushing!</p>
      <button mat-raised-button color="accent" (click)="onStop()">Stop</button>
    </section>
  `,
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer;
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    const step = this.trainingService.getRunningExercise().duration / 100;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingExit.emit();
      } else {
        this.startTimer();
      }
    });
  }
}
