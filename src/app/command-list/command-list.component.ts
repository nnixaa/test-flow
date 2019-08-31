import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, State, Store } from '@ngrx/store';
import { AppState } from 'src/app/state/root-reducer';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { getTestList, Test } from '../state/project/test.reducer';
import { NbDialogService } from '@nebular/theme';
import { AddCommandDialogComponent } from './add-test-dialog/add-command-dialog.component';
import { Command, commandInitAction, getCommandList } from '../state/project/command.reducer';
import { Location } from '@angular/common';
import { RecordedEvent, Recorder } from 'src/app/recorder/recorder';
import { TfCommandType, TfEventType } from 'src/app/@generator/generator-models';

@Component({
  selector: 'tf-spec-component',
  template: `
    <nb-layout>

      <nb-layout-header fixed>

        <button class="back" nbButton status="primary" (click)="back()">
          <nb-icon icon="arrow-back-outline"></nb-icon>
        </button>

        <span class="subtitle-2 text-hint">{{ (test$ | async)?.name }}</span>

        <button class="create-button" nbButton ghost size="small" (click)="createTest()">
          New Command
          <nb-icon icon="file-add"></nb-icon>
        </button>
      </nb-layout-header>

      <nb-layout-column>

        <tf-recorder-component></tf-recorder-component>

        <nb-list *ngIf="hasCommands$ | async">
          <nb-list-item *ngFor="let command of commands$ | async">
            <span class="subtitle-2">{{ command.type }}</span>
          </nb-list-item>
        </nb-list>

      </nb-layout-column>

      <nb-layout-footer fixed>
        <tf-download-button></tf-download-button>
      </nb-layout-footer>

    </nb-layout>
  `,
  styleUrls: ['./command-list.component.scss'],
})
export class CommandListComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  commands$: Observable<Command[]> = this.state.pipe(
    select(getCommandList),
    map(commands => commands.filter(t => t.test.id === this.currentTestId())),
  );

  test$: Observable<Test> = this.state.pipe(
    select(getTestList),
    map(tests => tests.find(s => s.id === this.route.snapshot.paramMap.get('id'))),
  );

  hasCommands$: Observable<boolean> = this.commands$.pipe(map(tests => !!tests.length));

  constructor(
    private state: State<AppState>,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private location: Location,
    private recorder: Recorder,
  ) {}

  ngOnInit() {
    this.recorder.events$
      .pipe(
        takeUntil(this.destroy$),
        map(events => this.toCommand(events)),
      )
      .subscribe((commandList: Command[]) => {
        this.store.dispatch(commandInitAction({ commandList }));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createTest() {
    this.test$.pipe(take(1)).subscribe((test) => {
      this.dialogService.open(AddCommandDialogComponent, { context: { test } });
    });
  }

  back() {
    this.location.back();
  }

  private currentTestId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  private toCommand(events: RecordedEvent[]): Command[] {
    return events.map(e => {
      return {
        type: TfCommandType.EVENT,
        target: e.xpath,
        eventType: this.mapEventType(e.type),
        eventParams: e.data,
        test: { id: this.currentTestId() },
      };
    });
  }

  private mapEventType(type: 'input' | 'click' | 'focusin'): TfEventType {
    switch (type) {
      case 'click': return TfEventType.CLICK;
      case 'focusin': return TfEventType.FOCUS;
      case 'input': return TfEventType.INPUT;
    }
  }
}
