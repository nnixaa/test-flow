import { Component } from '@angular/core';
import { select, State } from '@ngrx/store';
import { AppState } from 'src/app/state/root-reducer';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { getTestList, Test } from '../state/project/test.reducer';
import { NbDialogService } from '@nebular/theme';
import { AddTestDialogComponent } from './add-test-dialog/add-test-dialog.component';
import { getSpecList, Spec } from '../state/project/spec.reducer';
import { Location } from '@angular/common';

@Component({
  selector: 'tf-spec-component',
  template: `
    <nb-layout>

      <nb-layout-header fixed>

        <button class="back" nbButton status="primary" (click)="back()">
          <nb-icon icon="arrow-back-outline"></nb-icon>
        </button>

        <span class="subtitle-2 text-hint">{{ (spec$ | async)?.name }}</span>

        <button class="create-button" nbButton ghost size="small" (click)="createTest()">
          New Test
          <nb-icon icon="file-add"></nb-icon>
        </button>
      </nb-layout-header>

      <nb-layout-column>

        <nb-list *ngIf="hasTests$ | async; else noTestsText">
          <nb-list-item *ngFor="let test of tests$ | async">
            <a [routerLink]="['/', test.id, 'command-list']">
              <span class="subtitle-2">{{ test.name }}</span>
            </a>
          </nb-list-item>
        </nb-list>

        <ng-template #noTestsText>
          <p class="no-items caption-2">No Tests found.</p>
        </ng-template>

      </nb-layout-column>

      <nb-layout-footer fixed>
        <tf-download-button></tf-download-button>
      </nb-layout-footer>

    </nb-layout>
  `,
  styleUrls: ['./test-list.component.scss'],
})
export class TestListComponent {

  tests$: Observable<Test[]> = this.state.pipe(
    select(getTestList),
    map(tests => tests.filter(t => t.spec.id === this.route.snapshot.paramMap.get('id'))),
  );

  spec$: Observable<Spec> = this.state.pipe(
    select(getSpecList),
    map(specs => specs.find(s => s.id === this.route.snapshot.paramMap.get('id'))),
  );

  hasTests$: Observable<boolean> = this.tests$.pipe(map(tests => !!tests.length));

  constructor(private state: State<AppState>,
              private route: ActivatedRoute,
              private dialogService: NbDialogService,
              private location: Location) {
  }

  createTest() {
    this.spec$.pipe(take(1)).subscribe((spec) => {
      this.dialogService.open(AddTestDialogComponent, { context: { spec } });
    });
  }

  back() {
    this.location.back();
  }
}
