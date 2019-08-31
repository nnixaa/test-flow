import { Injectable } from '@angular/core';
import { classify, underscore } from '@ngrx/entity/schematics-core/utility/strings';

import { TfProject } from './generator-models';
import { SpecGeneratorService } from './spec-generator.service';

@Injectable()
export class GeneratorService {

  constructor(private specGenerator: SpecGeneratorService) {
  }

  generate(project: TfProject) {
    const fileList: { fileName: string, content: string }[] = [];
    for (const spec of project.specList) {
      fileList.push({ fileName: this.getFileName(spec.name), content: this.specGenerator.generateSpec(spec) });
    }
    return fileList
      .map((data: { fileName: string, content: string }) => `// ${data.fileName}.ts\n\n${data.content}`)
      .join('\n');
  }

  private getFileName(specName: string): string {
    return underscore(classify(specName)).replace(/_/ig, '-');
  }

}
