import { Component, OnInit } from '@angular/core';

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
  progress = 0;
  timer;
  constructor() {}

  ngOnInit() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
  }
}
