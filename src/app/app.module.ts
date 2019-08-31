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
  NbSelectModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { DownloadComponent } from './spec-list/download.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { StoreModule, USER_PROVIDED_META_REDUCERS } from '@ngrx/store';
import { reducers, metaReducers } from './state/root-reducer';
import { SpecListComponent } from 'src/app/spec-list/spec-list.component';
import { TestListComponent } from 'src/app/test-list/test-list.component';
import { DialogModule } from 'src/app/shared/dialog/dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommandListComponent } from 'src/app/command-list/command-list.component';
import { AddSpecDialogComponent } from 'src/app/spec-list/add-spec-dialog/add-spec-dialog.component';
import { AddTestDialogComponent } from './test-list/add-test-dialog/add-test-dialog.component';
import { AddCommandDialogComponent } from './command-list/add-test-dialog/add-command-dialog.component';
import { RecorderComponent } from 'src/app/command-list/recorder/recorder.component';
import { AddAssertDialogComponent } from './command-list/add-assert-dialog/add-assert-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SpecListComponent,
    DownloadComponent,
    TestListComponent,
    CommandListComponent,
    AddSpecDialogComponent,
    AddTestDialogComponent,
    AddCommandDialogComponent,
    RecorderComponent,
    AddAssertDialogComponent,
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
    NbSelectModule,
  ],
  providers: [
    { provide: USER_PROVIDED_META_REDUCERS, useValue: metaReducers },
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddSpecDialogComponent, AddTestDialogComponent, AddCommandDialogComponent, AddAssertDialogComponent],
})
export class AppModule {
}
