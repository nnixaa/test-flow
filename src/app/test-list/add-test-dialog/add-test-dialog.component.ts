import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl, Validators } from '@angular/forms';
import { Spec } from '../../state/project/spec.reducer';
import { Store } from '@ngrx/store';
import { AppState, nextId } from '../../state/root-reducer';
import { testAddAction } from '../../state/project/test.reducer';

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
  styleUrls: ['./add-test-dialog.component.scss']
})
export class AddTestDialogComponent {

  name: FormControl = new FormControl(
    '',
    [
      Validators.required,
    ],
  );

  spec: Spec;

  constructor(protected dialogRef: NbDialogRef<AddTestDialogComponent>, private store: Store<AppState>) {
  }

  close() {
    this.dialogRef.close();
  }

  create() {
    this.store.dispatch(testAddAction({
      test: {
        id: nextId(),
        name: this.name.value.trim(),
        spec: this.spec,
      }
    }));
    this.close();
  }

}
