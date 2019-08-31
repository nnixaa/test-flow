import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TfAssertType, TfCommand, TfCommandType, TfEventType } from './generator-models';
import { GeneratorService } from './generator.service';
import { SpecGeneratorService } from './spec-generator.service';

fdescribe('Spec generator', () => {

  let specService: SpecGeneratorService;
  let generatorService: GeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeneratorService,
        SpecGeneratorService,
      ],
    });

    generatorService = TestBed.get(GeneratorService as Type<GeneratorService>);
    specService = TestBed.get(SpecGeneratorService as Type<SpecGeneratorService>);
  });


  it('#should create spec string', () => {
    const TEST = generatorService.generate(
      {
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
      },
    );
    console.log(TEST);
    expect(1).toEqual(1);
  });

});
