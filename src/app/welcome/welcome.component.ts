import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  template: `
    <div
      class="welcome"
      fxLayout="column"
      fxLayoutAlign="center center"
      fxLayout.gt-md="row"
      fxLayoutGap.gt-md="30px"
    >
      <section>
        <h1>ACTIVITY</h1>
        <p>Stay active and enjoy better health and more fun!</p>
      </section>
      <section>
        <h1>COMMUNITY</h1>
        <p>Get to know other people who share your passion!</p>
      </section>
      <section>
        <h1>CHALLENGES</h1>
        <p>Never stop! Dive into new challenges every day</p>
      </section>
    </div>
  `,
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
