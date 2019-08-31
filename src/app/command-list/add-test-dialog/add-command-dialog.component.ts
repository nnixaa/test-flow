import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, nextId } from '../../state/root-reducer';
import { Test } from '../../state/project/test.reducer';
import { commandAddAction } from '../../state/project/command.reducer';

@Component({
  selector: 'tf-add-test-dialog',
  template: `
    <form (submit)="create()">
      <nb-card>
        <nb-card-body>
          <input
            type="text"
            nbInput
            placeholder="Test name"
            fieldSize="small"
            fullWidth
            name="name"
            [formControl]="name">
        </nb-card-body>
        <nb-card-footer>
          <a href="#" nbButton fullWidth status="info" size="small" (click)="close()">Cancel</a>
          <button nbButton fullWidth status="success" size="small" [disabled]="name.errors">Create</button>
        </nb-card-footer>
      </nb-card>
    </form>
  `,
  styleUrls: ['./add-command-dialog.component.scss']
})
export class AddCommandDialogComponent {

  name: FormControl = new FormControl(
    '',
    [
      Validators.required,
    ],
  );

  test: Test;

  constructor(protected dialogRef: NbDialogRef<AddCommandDialogComponent>, private store: Store<AppState>) {
  }

  close() {
    this.dialogRef.close();
  }

  create() {
    this.store.dispatch(commandAddAction({
      command: {
        id: nextId(),
        name: this.name.value.trim(),
        test: this.test,
      }
    }));
    this.close();
  }

}
