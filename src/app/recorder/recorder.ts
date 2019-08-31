import { Injectable } from '@angular/core';

export type MessageType =
  'recorder:start' |
  'recorder:stop' |
  'recorder:reset' |
  'recorder:replay';

export interface Message {
  type: MessageType;
  payload: any;
}

@Injectable({ providedIn: 'root' })
export class Recorder {
  start() {
    sendMessage({ type: 'recorder:start', payload: {} });
  }

  stop() {
    sendMessage({ type: 'recorder:stop', payload: {} });
  }

  reset() {
    sendMessage({ type: 'recorder:reset', payload: {} });
  }

  replay() {
    sendMessage({ type: 'recorder:replay', payload: {} });
  }
}

const sendMessage = (message: Message) => {
  this.window.parent.postMessage(message, '*');
};
