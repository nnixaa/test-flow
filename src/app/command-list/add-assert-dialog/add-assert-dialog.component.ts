import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, nextId } from '../../state/root-reducer';
import { Test } from '../../state/project/test.reducer';
import { commandAddAction } from '../../state/project/command.reducer';
import { Recorder } from '../../recorder/recorder';
import { take, takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'tf-add-test-dialog',
  template: `

    <ng-container *ngIf="!selectedElement; else createTemplate">
      <nb-card>
        <nb-card-body>

          <label class="label">
            Inspect an element to assert:
          </label>
          
          <button class="inspect" fullWidth nbButton (click)="toggleSelect()" [status]="selecting ? 'danger' : 'primary'">
            <nb-icon icon="plus-circle-outline" [options]="selecting ? {animation: { type: 'pulse', infinite: true }} : {}"></nb-icon>
          </button>
        </nb-card-body>
      </nb-card>
    </ng-container>

    <ng-template #createTemplate>
      <form (submit)="create()">
        <nb-card>
          <nb-card-body>

            <div class="form-row">
              <label class="label">
                Assert against:
              </label>

              <span>{{ this.selectedElement }}</span>
            </div>

            <div class="form-row">
              <label class="label">
                Assert type:
              </label>
              <nb-select
                fieldSize="small"
                placeholder="Choose assert"
                [formControl]="assert"
                fullWidth>
                <nb-option value="exist">toBeTruthy</nb-option>
                <nb-option value="containsText">containsText</nb-option>
                <nb-option value="hasClass">hasClass</nb-option>
              </nb-select>
            </div>

            <div class="form-row" *ngIf="assert.value === 'containsText' || assert.value === 'hasClass' ">
              <label class="label">
                Value:
              </label>

              <input
                type="text"
                nbInput
                placeholder="Value"
                fieldSize="small"
                fullWidth
                name="value"
                [formControl]="value">
            </div>
          </nb-card-body>
          <nb-card-footer>
            <a href="#" nbButton fullWidth status="info" size="small" (click)="close();false">Cancel</a>
            <button nbButton fullWidth status="success" size="small" [disabled]="assert.errors">Create</button>
          </nb-card-footer>
        </nb-card>
      </form>
    </ng-template>
  `,
  styleUrls: ['./add-assert-dialog.component.scss']
})
export class AddAssertDialogComponent {

  selectedElement: string;
  selecting = false;

  assert: FormControl = new FormControl(
    '',
    [],
  );

  value: FormControl = new FormControl(
    '',
    [
      Validators.required,
    ],
  );

  test: Test;

  constructor(protected dialogRef: NbDialogRef<AddAssertDialogComponent>,
              private store: Store<AppState>,
              private recorder: Recorder) {
  }

  close() {
    this.dialogRef.close();
  }

  create() {
    this.store.dispatch(commandAddAction({
      command: {
        id: nextId(),
        type: this.assert.value.trim(),
        test: this.test,
        target: this.selectedElement,
        expectedValue: this.value,
      }
    }));
    this.close();
  }

  toggleSelect() {

    if (this.selecting) {
      this.selecting = false;
      this.selectedElement = '';
    } else {
      this.selecting = true;
      this.recorder.select()
        .pipe(takeWhile(() => this.selecting))
        .subscribe((xpath: string) => {
          this.selectedElement = xpath;
          this.selecting = false;
        });
    }
  }

}
