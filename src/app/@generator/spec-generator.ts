import { TfCommand, TfCommandType, TfSpec, TfTest } from './generator-models';

class SpecGenerator {


  generateSpec(spec: TfSpec): string {
    const testListString = spec.testList
      .map((test: TfTest) => this.generateTest(test))
      .join('\n');
    return `
      describe('${spec.name}', function() {
        \n${testListString}\n
      })
    `;
  }

  generateTest(test: TfTest) {
    return `
      it('${test.name}', function() {

      })
    `;
  }

  generateCommand(command: TfCommand) {
    if (command.type === TfCommandType.ASSERTION) {

    } else {

    }
  }


}
