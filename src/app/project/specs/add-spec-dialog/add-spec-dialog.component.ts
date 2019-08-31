import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl, Validators } from '@angular/forms';

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

  constructor(protected dialogRef: NbDialogRef<AddSpecDialogComponent>) { }

  close() {
    this.dialogRef.close();
  }

  create() {
    console.log(this.name.value.trim());
  }

}
