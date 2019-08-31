import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getProject, Project } from 'src/app/state/project/project.reducer';
import { AppState } from 'src/app/state/root-reducer';

@Component({
  selector: 'tf-project-component',
  template: `
    <nb-layout>

      <nb-layout-header fixed>
        {{ name$ | async }}
      </nb-layout-header>

      <nb-layout-column>
        <tf-spec-list-component></tf-spec-list-component>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <a nbButton fullWidth size="small" class="download-button">
          Get project specs code
          <nb-icon icon="code-download-outline"></nb-icon>
        </a>
      </nb-layout-footer>

    </nb-layout>
  `,
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {

  name$: Observable<string> = this.store.pipe(
    select(getProject),
    map((project: Project) => project.name),
  );

  constructor(private store: Store<AppState>) {}
}
