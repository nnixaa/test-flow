import { NgModule } from '@angular/core';

import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from 'src/app/project/project-routing.module';
import { CommonModule } from '@angular/common';
import { SpecListComponent } from 'src/app/project/specs/spec-list.component';
import { SpecComponent } from 'src/app/project/specs/spec.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule } from '@nebular/theme';
import { AddSpecDialogComponent } from './specs/add-spec-dialog/add-spec-dialog.component';
import { DialogModule } from '../shared/dialog/dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ ProjectComponent, SpecListComponent, SpecComponent, AddSpecDialogComponent ],
  imports: [
    ProjectRoutingModule,
    CommonModule,
    NbListModule,
    NbLayoutModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    DialogModule.forChild(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [
    AddSpecDialogComponent,
  ],
})
export class ProjectModule {}
