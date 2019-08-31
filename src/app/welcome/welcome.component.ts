import { Component } from '@angular/core';

@Component({
  selector: 'tf-welcome-component',
  template: `
    <img class="logo" src="/assets/icon-default.png" alt="Test Pup">
    <a class="start-button" nbButton routerLink="/spec-list">Start</a>
  `,
  styleUrls: [ './welcome.component.scss' ],
})
export class WelcomeComponent {
}
