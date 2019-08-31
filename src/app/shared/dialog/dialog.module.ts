import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbDialogModule, NbDialogService } from '@nebular/theme';
import { DialogService } from './dialog.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
})
export class DialogModule {
  static forChild(): ModuleWithProviders {
    return {
      ngModule: DialogModule,
      providers: [
        ...NbDialogModule.forChild({
          hasBackdrop: false,
        }).providers,
        { provide: NbDialogService, useClass: DialogService },
      ],
    } as ModuleWithProviders;
  }
}
