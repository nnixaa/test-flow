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

export interface TfCommand {
  node: any;
  type: TfCommandType;
}

export enum TfCommandType {
  EVENT = 'Event',
  ASSERTION = 'Assertion',
}

export interface TfAssertCommand extends TfCommand {
  assertType: 'exist' | 'not-exist' | 'contains';
  expectVal: any;
}

export interface TfEventCommand extends TfCommand {
  eventType: string;
  eventParams: any;
  target: any;
}


