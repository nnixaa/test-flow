import { NgModule } from '@angular/core';

import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from 'src/app/project/project-routing.module';
import { CommonModule } from '@angular/common';
import { SpecListComponent } from 'src/app/project/specs/spec-list.component';

@NgModule({
  declarations: [ ProjectComponent, SpecListComponent ],
  imports: [ ProjectRoutingModule, CommonModule, ],
  providers: [],
})
export class ProjectModule {}
