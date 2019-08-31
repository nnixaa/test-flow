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
          name: 'first spec',
          testList: [
            {
              name: 'should click on button',
              commandList: [
                {
                  target: 'button[nbButton]#2',
                  type: TfCommandType.EVENT,
                  eventType: TfEventType.CLICK,
                } as TfCommand,
                {
                  target: 'button[nbButton]#2',
                  type: TfCommandType.ASSERT,
                  assertType: TfAssertType.EXIST,
                } as TfCommand,
              ]
            },
          ],
        },
        {
          name: 'Second spec',
          testList: [
            {
              name: 'should click on button',
              commandList: [
                {
                  target: 'button[nbButton]#2',
                  type: TfCommandType.EVENT,
                  eventType: TfEventType.CLICK,
                } as TfCommand,
                {
                  target: 'button[nbButton]#2',
                  type: TfCommandType.ASSERT,
                  assertType: TfAssertType.EXIST,
                } as TfCommand,
              ]
            },
            {
              name: 'should input in text',
              commandList: [
                {
                  target: 'input[nbInput]#1',
                  type: TfCommandType.EVENT,
                  eventType: TfEventType.INPUT,
                  eventParams: 'text',
                } as TfCommand,
                {
                  target: 'in[nbButton]#2',
                  type: TfCommandType.ASSERT,
                  assertType: TfAssertType.CONTAINS_TEXT,
                  expectedValue: 'text',
                } as TfCommand,
              ]
            },
          ],
        }
      ],
    };

    this.downloadService.download(this.generatorService.generate(project));
  }

}
