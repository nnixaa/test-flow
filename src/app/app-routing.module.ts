import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TestListComponent } from 'src/app/test-list/test-list.component';
import { SpecListComponent } from 'src/app/spec-list/spec-list.component';
import { CommandListComponent } from 'src/app/command-list/test-list.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'spec-list',
    component: SpecListComponent,
  },
  {
    path: ':id/test-list',
    component: TestListComponent,
  },
  {
    path: ':id/command-list',
    component: CommandListComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
