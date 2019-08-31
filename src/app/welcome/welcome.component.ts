import { Component } from '@angular/core';

@Component({
  selector: 'tf-welcome-component',
  template: `
    <p>Welcome</p>
    <a routerLink="/spec-list">Project</a>
  `,
})
export class WelcomeComponent {
}
