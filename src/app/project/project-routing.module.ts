import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectComponent } from './project.component';
import { SpecComponent } from 'src/app/project/specs/spec.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProjectComponent
      },
      {
        path: 'spec',
        children: [
          {
            path: ':id',
            component: SpecComponent,
          }
        ]
      }
    ]),
  ],
  exports: [ RouterModule ],
})
export class ProjectRoutingModule {}
