import { Component } from '@angular/core';

@Component({
  selector: 'tf-welcome-component',
  template: `
    <nb-layout>
      <nb-layout-column>
        <img class="logo" src="/assets/icon-default.png" alt="Test Pup">
        <a class="start-button" nbButton routerLink="/spec-list">Start</a>
      </nb-layout-column>
    </nb-layout>
  `,
  styleUrls: [ './welcome.component.scss' ],
})
export class WelcomeComponent {
}
