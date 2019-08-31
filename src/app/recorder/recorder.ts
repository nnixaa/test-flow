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
    this.sendMessage({ type: 'recorder:start', payload: {} });
  }

  stop() {
    this.sendMessage({ type: 'recorder:stop', payload: {} });
  }

  reset() {
    this.sendMessage({ type: 'recorder:reset', payload: {} });
  }

  replay() {
    this.sendMessage({ type: 'recorder:replay', payload: {} });
  }

  sendMessage(message: Message) {
    window.parent.postMessage(message, '*');
  }
}

