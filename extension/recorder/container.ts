import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Recorder } from './recorder';


export type MessageType =
  'recorder:start' |
  'recorder:stop' |
  'recorder:reset' |
  'recorder:replay';

export interface Message {
  type: MessageType;
  payload: any;
}

export const initializeRecorder = () => {
  const recorder = new Recorder();

  debugger;

  receiveMessage('recorder:start').subscribe(() => console.log('recorder:start'));
  receiveMessage('recorder:stop').subscribe(() => console.log('recorder:stop'));
  receiveMessage('recorder:reset').subscribe(() => console.log('recorder:reset'));
  receiveMessage('recorder:replay').subscribe(() => console.log('recorder:replay'));
};

const receiveMessage = (messageType: MessageType) => {
  return fromEvent<Message>(this.window, 'message')
    .pipe(
      filter((message: Message) => message.type === messageType),
      map((message: Message) => message.payload),
    );
};
