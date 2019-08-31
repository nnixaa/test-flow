export interface TfProject {
  name: string;
  url: string;
  specList: TfSpec[];
}

// describe
export interface TfSpec {
  name: string;
  testList: TfTest[];
}

// it
export interface TfTest {
  name: string;
  commandList: TfCommand[];
}

export enum TfCommandType {
  EVENT = 'Event',
  ASSERT = 'Assertion',
}

export enum TfAssertType {
  EXIST = 'exist',
  CONTAINS_TEXT = 'containsText',
  HAS_CLASS = 'hasClass',
}

export enum TfEventType {
  CLICK = 'click',
  INPUT = 'input',
  FOCUS = 'focus',
}

export interface TfCommand {
  // xpath
  target: string;
  type: TfCommandType;
}

export interface TfAssertCommand extends TfCommand {
  assertType: TfAssertType;
  expectedValue?: any;
}

export interface TfEventCommand extends TfCommand {
  eventType: TfEventType;
  eventParams?: any;
}


