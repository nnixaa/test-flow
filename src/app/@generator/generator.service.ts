import { Injectable } from '@angular/core';
import { classify, underscore } from '@ngrx/entity/schematics-core/utility/strings';

import { TfProject } from './generator-models';
import { SpecGeneratorService } from './spec-generator.service';

@Injectable({ providedIn: 'root' })
export class GeneratorService {

  constructor(private specGenerator: SpecGeneratorService) {
  }

  generate(project: TfProject) {
    const fileList: { fileName: string, content: string }[] = [];
    for (const spec of project.specList) {
      fileList.push({ fileName: this.getFileName(spec.name), content: this.specGenerator.generateSpec(spec) });
    }
    return fileList;
      // .map((data: { fileName: string, content: string }) => `// ${data.fileName}.ts\n\n${data.content}`)
      // .join('\n');
  }

  private getFileName(specName: string): string {
    return specName
      .split('.').map(part => this.capitalize(this.camelize(part))).join('.')
      .replace((/([a-z\d])([A-Z]+)/g), '$1_$2')
      .replace((/-|\s+/g), '_')
      .toLowerCase()
      .replace(/_/ig, '-') + '.e2e-spec.ts';
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.substr(1);
  }

  private camelize(str: string): string {
    return str
      .replace((/(-|_|\.|\s)+(.)?/g), (match: string, separator: string, chr: string) => {
        return chr ? chr.toUpperCase() : '';
      })
      .replace(/^([A-Z])/, (match: string) => match.toLowerCase());
  }

}
