import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/state/root-reducer';
import { Observable } from 'rxjs';
import { getSpecList, Spec } from 'src/app/state/project/spec.reducer';
import { map } from 'rxjs/operators';
import { AddSpecDialogComponent } from './add-spec-dialog/add-spec-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { getProject, Project } from 'src/app/state/project/project.reducer';
import { Location } from '@angular/common';

@Component({
  selector: 'tf-spec-list-component',
  template: `
    <nb-layout>

      <nb-layout-header fixed>
        <button class="back" nbButton status="primary" (click)="back()">
          <nb-icon icon="arrow-back-outline"></nb-icon>
        </button>

        <span class="subtitle-2 text-hint">{{ name$ | async }}</span>

        <button class="create-button" nbButton ghost size="small" (click)="createSpec()">
          New Spec
          <nb-icon icon="file-add"></nb-icon>
        </button>
      </nb-layout-header>

      <nb-layout-column>

        <nb-list *ngIf="hasSpecs$ | async; else noSpecsText">
          <nb-list-item *ngFor="let spec of specs$ | async">
            <a [routerLink]="['/', spec.id, 'test-list']">
              <span class="subtitle-2">{{ spec.name }}</span>
            </a>
          </nb-list-item>
        </nb-list>

        <ng-template #noSpecsText>
          <p>No Specs</p>
        </ng-template>

      </nb-layout-column>

      <nb-layout-footer fixed>
        <tf-download-button></tf-download-button>
      </nb-layout-footer>

    </nb-layout>
  `,
  styleUrls: [ './spec-list.component.scss' ],
})
export class SpecListComponent {

  name$: Observable<string> = this.store.pipe(
    select(getProject),
    map((project: Project) => project.name),
  );

  specs$: Observable<Spec[]> = this.store.pipe(
    select(getSpecList),
  );

  hasSpecs$: Observable<boolean> = this.specs$.pipe(map(specs => !!specs.length));

  constructor(private store: Store<AppState>, private dialogService: NbDialogService, private location: Location) {}

  createSpec() {
    this.dialogService.open(AddSpecDialogComponent);
  }

  back() {
    this.location.back();
  }
}
