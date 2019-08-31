import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

export type MessageType =
  'recorder:start' |
  'recorder:stop' |
  'recorder:reset' |
  'recorder:replay' |
  'recorder:select' |
  'recorder:select:done';

export interface Message {
  type: MessageType;
  payload: any;
}

export interface RecordedEvent {
  target: HTMLElement;
  xpath: string;
  type: 'input' | 'click' | 'focusin';
  data: string;
}

@Injectable({ providedIn: 'root' })
export class Recorder {
  private events = new BehaviorSubject<RecordedEvent[]>([]);
  readonly events$: Observable<RecordedEvent[]> = this.events.asObservable();

  constructor() {
    fromEvent(window, 'message').subscribe((event: any) => {
      const data = event.data;

      if (data.type === 'recorder:commands') {
        console.info('[EXTENSION] Events', { event });
        this.events.next(data.payload.events);
      }
    });
  }

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
    this.sendMessage({ type: 'recorder:replay', payload: { events: this.events.getValue() } });
  }

  select(): Observable<string> {
    this.sendMessage({ type: 'recorder:select', payload: {} });

    return fromEvent(window, 'message')
      .pipe(
        filter((event: any) => event.data.type === 'recorder:select:done'),
        take(1),
        map((event: any) => event.data.payload.xpath),
      );
  }

  sendMessage(message: Message) {
    window.parent.postMessage(message, '*');
  }
}

