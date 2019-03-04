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
        <img
          src="https://images.unsplash.com/photo-1513907450027-b9926e160c2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80"
          alt="bow and arrow"
        />
      </section>
      <section>
        <h1>COMMUNITY</h1>
        <p>Get to know other people who share your passion!</p>
        <img
          src="https://images.unsplash.com/photo-1493689485253-f07fcbfc731b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1933&q=80"
          alt="community"
        />
      </section>
      <section>
        <h1>CHALLENGES</h1>
        <p>Never stop! Dive into new challenges every day</p>
        <img
          src="https://images.unsplash.com/photo-1442128788708-15f1811dd622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="rock climbing"
        />
      </section>
    </div>
  `,
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
