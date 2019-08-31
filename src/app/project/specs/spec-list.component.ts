import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/state/root-reducer';
import { Observable } from 'rxjs';
import { getSpecList, Spec } from 'src/app/state/project/spec.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tf-spec-list-component',
  template: `
    <nb-list *ngIf="hasSpecs$ | async; else noSpecsText">
      <nb-list-item *ngFor="let spec of specs$ | async">
        <a [routerLink]="['./spec', spec.id]">
          <span class="subtitle-2">{{ spec.name }}</span>
        </a>
      </nb-list-item>
    </nb-list>

    <ng-template #noSpecsText>
      <p>No Specs</p>
    </ng-template>
  `,
  styleUrls: [ './spec-list.component.scss' ],
})
export class SpecListComponent {
  specs$: Observable<Spec[]> = this.store.pipe(
    select(getSpecList),
  );

  hasSpecs$: Observable<boolean> = this.specs$.pipe(map(specs => !!specs.length));

  constructor(private store: Store<AppState>) {}
}
