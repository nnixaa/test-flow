import { Component } from '@angular/core';
import { select, State } from '@ngrx/store';
import { AppState } from 'src/app/state/root-reducer';
import { Observable } from 'rxjs';
import { getSpecList, Spec } from 'src/app/state/project/spec.reducer';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tf-spec-component',
  template: `
    {{ spec$ | async | json }}
  `,
})
export class TestListComponent {

  spec$: Observable<Spec> = this.state.pipe(
    select(getSpecList),
    map(specs => specs.find(s => s.id === this.route.snapshot.paramMap.get('id'))),
  );

  constructor(private state: State<AppState>, private route: ActivatedRoute) {}
}
