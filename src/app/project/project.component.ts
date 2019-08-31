import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getProject, Project } from 'src/app/state/project/project.reducer';
import { AppState } from 'src/app/state/root-reducer';

@Component({
  selector: 'tf-project-component',
  template: `
    {{ name$ | async }}

    <tf-spec-list-component></tf-spec-list-component>
  `,
})
export class ProjectComponent {

  name$: Observable<string> = this.store.pipe(
    select(getProject),
    map((project: Project) => project.name),
  );

  constructor(private store: Store<AppState>) {}
}
