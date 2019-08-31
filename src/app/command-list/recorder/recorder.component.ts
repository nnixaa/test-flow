import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/state/root-reducer';
import { Observable, Subject } from 'rxjs';
import { getRecorder, recorderStartAction, recorderStopAction } from 'src/app/state/project/recorder.reducer';
import { map, take } from 'rxjs/operators';
import { Recorder } from 'src/app/recorder/recorder';

@Component({
  selector: 'tf-recorder-component',
  template: `
    <div class="control-buttons">
      <button class="control-button button-record"
              nbButton
              status="danger"
              (click)="toggleRecording()"
              [appearance]="(isRecording$ | async) ? 'outline' : 'filled'">
        <div class="circle-icon" [class.glow]="isRecording$ | async"></div>
        {{ (isRecording$ | async) ? 'Stop Recording' : 'Record Screen' }}
      </button>
      <button class="control-button button-play" size="large" nbButton ghost (click)="replay()">
        <nb-icon icon="arrow-right"></nb-icon>
      </button>
      <button class="control-button button-delete" nbButton ghost (click)="reset()">
        <nb-icon icon="trash-2"></nb-icon>
      </button>
    </div>
    
    <button class="control-button button-delete" nbButton ghost (click)="select()">
      Select
    </button>
  `,
  styleUrls: ['./recorder.component.scss'],
})
export class RecorderComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  isRecording$: Observable<boolean> = this.store.pipe(
    select(getRecorder),
    map(r => r.isRecording),
  );

  constructor(
    private store: Store<AppState>,
    private recorder: Recorder,
  ) {}

  toggleRecording() {
    this.isRecording$.pipe(
        take(1),
      )
      .subscribe(isRecording => {
        if (isRecording) {
          this.recorder.stop();
          this.store.dispatch(recorderStopAction());
        } else {
          this.recorder.start();
          this.store.dispatch(recorderStartAction());
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  reset() {
    this.recorder.reset();
  }

  replay() {
    this.recorder.replay();
  }

  select() {
    this.recorder.select().subscribe(id => console.log('selected xpath: ', id));
  }
}
