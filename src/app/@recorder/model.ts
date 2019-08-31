export interface RecordedEvent {
  target: HTMLElement;
  type: 'input' | 'click' | 'focusin';
  data: string;
  event: Event;
}
