import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbListModule,
  NbButtonModule,
  NbInputModule,
  NbIconModule,
  NbCardModule,
  NbDialogModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { StoreModule, USER_PROVIDED_META_REDUCERS } from '@ngrx/store';
import { reducers, metaReducers } from './state/root-reducer';
import { SpecListComponent } from 'src/app/spec-list/spec-list.component';
import { TestListComponent } from 'src/app/test-list/test-list.component';
import { DialogModule } from 'src/app/shared/dialog/dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommandListComponent } from 'src/app/command-list/test-list.component';
import { AddSpecDialogComponent } from 'src/app/spec-list/add-spec-dialog/add-spec-dialog.component';
import { AddTestDialogComponent } from './test-list/add-test-dialog/add-test-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SpecListComponent,
    TestListComponent,
    CommandListComponent,
    AddSpecDialogComponent,
    AddTestDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot(),
    NbEvaIconsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    NbListModule,
    NbLayoutModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbDialogModule,
    DialogModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: USER_PROVIDED_META_REDUCERS, useValue: metaReducers },
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddSpecDialogComponent, AddTestDialogComponent],
})
export class AppModule { }
