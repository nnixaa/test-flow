import { Component } from '@angular/core';
import { select, State } from '@ngrx/store';
import { AppState } from 'src/app/state/root-reducer';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { getTestList, Test } from '../state/project/test.reducer';
import { NbDialogService } from '@nebular/theme';
import { AddCommandDialogComponent } from './add-test-dialog/add-command-dialog.component';
import { Command, getCommandList } from '../state/project/command.reducer';
import { Recorder } from '../recorder/recorder';

@Component({
  selector: 'tf-spec-component',
  template: `
    <nb-layout>

      <nb-layout-header fixed>
        {{ (test$ | async)?.name }}

        <button class="create-button" nbButton ghost size="small" (click)="createTest()">
          New Command
          <nb-icon icon="file-add"></nb-icon>
        </button>
      </nb-layout-header>

      <nb-layout-column>

        <nb-list *ngIf="hasCommands$ | async; else noTestsText">
          <nb-list-item *ngFor="let command of commands$ | async">
            <span class="subtitle-2">{{ command.name }}</span>
          </nb-list-item>
        </nb-list>

        <ng-template #noTestsText>
          <p>No Tests</p>
        </ng-template>

        <button nbButton (click)="start()">Start</button>
        <button nbButton (click)="stop()">Stop</button>
        <button nbButton (click)="reset()">Reset</button>
        <button nbButton (click)="replay()">Replay</button>

      </nb-layout-column>

      <nb-layout-footer fixed>
        <a nbButton fullWidth size="small" class="download-button">
          Get project tests code
          <nb-icon icon="code-download-outline"></nb-icon>
        </a>
      </nb-layout-footer>

    </nb-layout>
  `,
  styleUrls: ['./command-list.component.scss'],
})
export class CommandListComponent {

  commands$: Observable<Command[]> = this.state.pipe(
    select(getCommandList),
    map(commands => commands.filter(t => t.test.id === this.route.snapshot.paramMap.get('id'))),
  );

  test$: Observable<Test> = this.state.pipe(
    select(getTestList),
    map(tests => tests.find(s => s.id === this.route.snapshot.paramMap.get('id'))),
  );

  hasCommands$: Observable<boolean> = this.commands$.pipe(map(tests => !!tests.length));

  constructor(private state: State<AppState>, private route: ActivatedRoute, private dialogService: NbDialogService,
              private recorder: Recorder) {
  }

  createTest() {
    this.test$.pipe(take(1)).subscribe((test) => {
      this.dialogService.open(AddCommandDialogComponent, { context: { test } });
    });
  }

  start() {
    this.recorder.start();
  }

  stop() {
    this.recorder.stop();
  }

  reset() {
    this.recorder.reset();
  }

  replay() {
    this.recorder.replay();
  }
}
