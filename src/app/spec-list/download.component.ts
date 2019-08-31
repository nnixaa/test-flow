import { Component } from '@angular/core';
import { select, State, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { AppState } from 'src/app/state/root-reducer';
import { DownloadService } from '../@generator/download.service';
import { TfAssertType, TfCommand, TfCommandType, TfEventType, TfProject } from '../@generator/generator-models';
import { GeneratorService } from '../@generator/generator.service';
import { getConvertedState } from '../state/state.selector';

@Component({
  selector: 'tf-download-button',
  template: `
    <button nbButton fullWidth size="small" class="download-button" (click)="download()">
      Get project specs code
      <nb-icon icon="code-download-outline"></nb-icon>
    </button>
  `,
})
export class DownloadComponent {

  constructor(private store: Store<AppState>, private generatorService: GeneratorService, private downloadService: DownloadService) {
  }

  download() {

    this.store.pipe(
      select(getConvertedState),
      take(1),
    )
      .subscribe((project: TfProject) => {
        this.downloadService.download(this.generatorService.generate(project));
      });
  }

}
