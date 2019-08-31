import { Injectable } from '@angular/core';
import prettier from 'prettier/standalone';
import parserTs from 'prettier/parser-typescript';

import {
  TfAssertCommand,
  TfAssertType,
  TfCommand,
  TfCommandType,
  TfEventCommand,
  TfEventType,
  TfSpec,
  TfTest,
} from './generator-models';

@Injectable({ providedIn: 'root' })
export class SpecGeneratorService {

  generateSpec(spec: TfSpec): string {
    const testListString = spec.testList
      .map((test: TfTest) => this.generateTest(test))
      .join('\n');
    const code = `
      import { browser, element, by } from 'protractor'

      describe('${spec.name}', () => {

        beforeEach(done => {
           browser.get('${spec.url}').then(() => done());
        });

        \n${testListString}\n
      });
    `;
    return prettier.format(code, { parser: 'typescript', plugins: [parserTs], singleQuote: true });
  }

  private generateTest(test: TfTest): string {
    const commandListString = test.commandList
      .map((command: TfCommand) => this.generateCommand(command))
      .join('\n');
    return `
      it('${test.name}', () => {
        \n${commandListString}\n
      });
    `;
  }

  private generateCommand(command: TfCommand): string {
    if (command.type === TfCommandType.ASSERT) {
      const assertCommand: TfAssertCommand = command as TfAssertCommand;
      return `\n expect(${this.getTarget(command)}).${this.getAssert(assertCommand)};`;
    } else {
      const eventCommand: TfEventCommand = command as TfEventCommand;
      return `\n ${this.getTarget(command)}.${this.makeEvent(eventCommand)};`;
    }
  }

  private getAssert(assertCommand: TfAssertCommand): string {
    if (assertCommand.assertType === TfAssertType.EXIST) {
      return 'toBeTruthy()';
    } else if (assertCommand.assertType === TfAssertType.CONTAINS_TEXT) {
      return `toContain('${assertCommand.expectedValue}')`;
    }
  }

  private makeEvent(eventCommand: TfEventCommand): string {
    if (eventCommand.eventType === TfEventType.CLICK) {
      return 'click()';
    } else if (eventCommand.eventType === TfEventType.FOCUS) {
      return 'focus()';
    } else if (eventCommand.eventType === TfEventType.INPUT) {
      return `sendKeys('${eventCommand.eventParams}')`;
    } else {
      return '';
    }
  }

  private getTarget(command: TfCommand): string {
    let element = `element(by.xpath('${command.target}'))`;
    if (command.type === TfCommandType.ASSERT
      && (command as TfAssertCommand).assertType === TfAssertType.CONTAINS_TEXT) {
      element += '.getText()';
    }
    return element;
  }


}
