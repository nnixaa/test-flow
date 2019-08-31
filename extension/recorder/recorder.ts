import { EventSelector, getInlineDefinition, getInlineInvocation, PrebootData, PrebootOptions } from 'preboot';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { RecordedEvent } from './model';
import { Replayer } from './replayer';


const eventSelectors = [
  // for recording changes in form elements
  { selector: 'input,textarea', events: ['input'] },
  { selector: 'select,option', events: ['change'] },

  // when user hits return button in an input box
  { selector: 'input', events: ['keyup'], keyCodes: [13] },

  // when user submit form (press enter, click on button/input[type="submit"])
  { selector: 'form', events: ['submit'] },

  // for tracking focus (no need to replay)
  { selector: 'input,textarea', events: ['focusin', 'focusout'] },

  // user clicks on a button
  { selector: 'button', events: ['click'] },
];

const prebootOptions: PrebootOptions = {
  appRoot: 'div#working-area',
  replay: false,
  disableOverlay: true,
// @ts-ignore
  eventSelectors,
};

export class Recorder {

  private replayer: Replayer = new Replayer();

  private replaying = false;
  private recording = false;

  private events = new BehaviorSubject<RecordedEvent[]>([]);
  readonly events$: Observable<RecordedEvent[]> = this.events.asObservable();

  constructor() {
    // @ts-ignore
    window.player = this;

    // @ts-ignore
    Object.values(eventSelectors).forEach((val: EventSelector) => val.action = this.handleEvent);
    this.init();
  }

  init() {
    const inlineCodeDefinition = getInlineDefinition(prebootOptions);
    const inlineCodeInvocation = getInlineInvocation();

    const script = document.createElement('script');
    script.textContent = inlineCodeDefinition + inlineCodeInvocation;
    document.body.appendChild(script);
  }

  start(): void {
    this.recording = true;
  }

  stop(): void {
    const prebootData: PrebootData = (window as any).prebootData;
    this.replayer.cleanup(prebootData);
    this.recording = false;
  }

  replay(events: RecordedEvent[]) {
    this.replaying = true;
    return this.replayer.replay(events).pipe(
      finalize(() => this.replaying = false),
    );
  }

  reset() {
    this.events.next([]);
  }

  private handleEvent = (target: HTMLElement, event: Event) => {
    const { id } = target;
    // TODO remove
    if (id === 'start' || id === 'stop' || id === 'replay' || id === 'reset') {
      return;
    }

    // @ts-ignore
    const player = window.player;

    // Don't emit new event if it's replay
    if (player.replaying || !player.recording) {
      return;
    }

    const recordedEvents: RecordedEvent[] = [...player.events.getValue()];

    const lastEvent = recordedEvents.pop();

    // If user typing we're buffering all input events in one
    if (lastEvent && lastEvent.type === 'input' && event.type === 'input') {
      // @ts-ignore
      console.log(player.events.getValue(), recordedEvents);
      const prevChar = lastEvent.data || '';
      // @ts-ignore
      player.events.next([...recordedEvents, { ...lastEvent, data: prevChar + event.data }]);
    } else {
      player.events.next([...player.events.getValue(), {
        target,
        event,
        type: event.type,
        // @ts-ignore
        data: event.data,
      }]);
    }
  };
}
