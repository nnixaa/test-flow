import { EventSelector, getInlineDefinition, getInlineInvocation, PrebootData, PrebootOptions } from 'preboot';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';

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
  private selecting = false;

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

    this.setupEventHandler();
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

  select(): Observable<string> {
    this.selecting = true;
    return fromEvent(document, 'click').pipe(
      take(1),
      map((event: MouseEvent) => getXPathForElement(event.target)),
      finalize(() => this.selecting = false),
    );
  }

  private setupEventHandler() {
    window.addEventListener('recorder', (e: any) => {
      const { detail: event } = e;

      // Don't emit new event if it's replay
      if (this.replaying || !this.recording || this.selecting) {
        return;
      }

      const recordedEvents: RecordedEvent[] = [...this.events.getValue()];

      const lastEvent = recordedEvents.pop();

      // If user typing we're buffering all input events in one
      if (lastEvent && lastEvent.type === 'input' && event.type === 'input') {
        // @ts-ignore
        console.log(this.events.getValue(), recordedEvents);
        const prevChar = lastEvent.data || '';
        // @ts-ignore
        this.events.next([...recordedEvents, { ...lastEvent, data: prevChar + event.data }]);
      } else {
        this.events.next([...this.events.getValue(), {
          xpath: event.xpath,
          type: event.type,
          // @ts-ignore
          data: event.data,
        }]);
      }
    });
  }

  private handleEvent = (target: HTMLElement, event: Event) => {
    const xpath = getXPath(target);

    window.dispatchEvent(new CustomEvent<any>('recorder', {
      detail: {
        xpath,
        type: event.type,
        // @ts-ignore
        data: event.data,
      },
    }));

    // Duplication required
    function getXPath(element) {
      const idx = (sib, name) => sib
        ? idx(sib.previousElementSibling, name || sib.localName) + (sib.localName == name)
        : 1;
      const segs = elm => !elm || elm.nodeType !== 1
        ? ['']
        : elm.id && document.getElementById(elm.id) === elm
          ? [`id("${elm.id}")`]
          // @ts-ignore
          : [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm)}]`];
      return segs(element).join('/');
    }
  }
}

function getXPathForElement(element) {
  const idx = (sib, name) => sib
    ? idx(sib.previousElementSibling, name || sib.localName) + (sib.localName == name)
    : 1;
  const segs = elm => !elm || elm.nodeType !== 1
    ? ['']
    : elm.id && document.getElementById(elm.id) === elm
      ? [`id("${elm.id}")`]
      // @ts-ignore
      : [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm)}]`];
  return segs(element).join('/');
}
