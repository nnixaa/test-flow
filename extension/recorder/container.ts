import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Recorder } from './recorder';
import { RecordedEvent } from './model';


export type MessageType =
  'recorder:start' |
  'recorder:stop' |
  'recorder:reset' |
  'recorder:replay' |
  'recorder:commands';

export interface Message {
  type: MessageType;
  payload: any;
}

export const initializeRecorder = (iframe: HTMLIFrameElement) => {
  const recorder = new Recorder();

  recorder.events$.subscribe((events: RecordedEvent[]) => {
    iframe.contentWindow.postMessage({ type: 'recorder:commands', payload: { events } }, '*');
  });

  receiveMessage('recorder:start').subscribe(() => recorder.start());
  receiveMessage('recorder:stop').subscribe(() => recorder.stop());
  receiveMessage('recorder:reset').subscribe(() => recorder.reset());
  receiveMessage('recorder:replay').subscribe((events: any) => {
    console.info('[CONTENT] Replay Events', { events });
    recorder.replay(events.events).subscribe();
  });
};

const receiveMessage = (messageType: MessageType) => {
  return fromEvent<Message>(window, 'message')
    .pipe(
      // @ts-ignore
      map(({ data }) => data),
      filter((message: Message) => message.type === messageType),
      map((message: Message) => message.payload),
    );
};
