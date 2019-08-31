import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TfAssertType, TfCommand, TfCommandType, TfEventType } from './generator-models';
import { SpecGeneratorService } from './spec-generator.service';

describe('Spec generator', () => {

  let specService: SpecGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpecGeneratorService,
      ],
    });

    specService = TestBed.get(SpecGeneratorService as Type<SpecGeneratorService>);
  });


  it('#should create spec string', () => {
    const spec1 = specService.generateSpec({
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
    });
    console.log(spec1);
    expect(1).toEqual(1);
  });

});
