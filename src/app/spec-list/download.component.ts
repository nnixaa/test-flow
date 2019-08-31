import { Component } from '@angular/core';
import { State } from '@ngrx/store';

import { AppState } from 'src/app/state/root-reducer';
import { DownloadService } from '../@generator/download.service';
import { TfAssertType, TfCommand, TfCommandType, TfEventType } from '../@generator/generator-models';
import { GeneratorService } from '../@generator/generator.service';

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

  constructor(private state: State<AppState>, private generatorService: GeneratorService, private downloadService: DownloadService) {
  }

  download() {

    const project = {
      name: 'app',
      url: 'app',
      specList: [
        {
          name: 'Add Item test',
          testList: [
            {
              name: 'should add item',
              commandList: [
                {
                  target: '/html/body/ec-root/nb-layout/div[1]/div/div/div/div/nb-layout-column/d' +
                    'iv[2]/ec-colors-panel/div[1]/ec-color-block/ec-color-selector/div/ec-input-color-picker/input',
                  type: TfCommandType.EVENT,
                  eventType: TfEventType.CLICK,
                } as TfCommand,
                {
                  target: '//*[@id="cdk-overlay-2"]/nb-popover/nb-overlay-container/ec-color-picker',
                  type: TfCommandType.ASSERT,
                  assertType: TfAssertType.EXIST,
                } as TfCommand,
              ]
            },
          ],
        },
      ],
    };

    this.downloadService.download(this.generatorService.generate(project));
  }

}
