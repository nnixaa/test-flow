import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl, Validators } from '@angular/forms';
import { specAddAction } from '../../../state/project/spec.reducer';
import { Store } from '@ngrx/store';
import { AppState, nextId } from '../../../state/root-reducer';

@Component({
  selector: 'tf-add-spec-dialog',
  template: `
    <form (submit)="create()">
      <nb-card>
        <nb-card-body>
          <input
            type="text"
            nbInput
            placeholder="Spec name"
            fieldSize="small"
            fullWidth
            name="name"
            [formControl]="name">
        </nb-card-body>
        <nb-card-footer>
          <button nbButton fullWidth status="info" size="small" (click)="close()">Cancel</button>
          <button nbButton fullWidth status="success" size="small" [disabled]="name.errors">Create</button>
        </nb-card-footer>
      </nb-card>
    </form>
  `,
  styleUrls: ['./add-spec-dialog.component.scss']
})
export class AddSpecDialogComponent {

  name: FormControl = new FormControl(
    '',
    [
      Validators.required,
    ],
  );

  constructor(protected dialogRef: NbDialogRef<AddSpecDialogComponent>, private store: Store<AppState>) { }

  close() {
    this.dialogRef.close();
  }

  create() {
    this.store.dispatch(specAddAction({ spec: { id: nextId(), name: this.name.value.trim() } }));
    this.close();
  }

}
