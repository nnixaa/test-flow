export interface RecordedEvent {
  target: HTMLElement;
  xpath: string;
  type: 'input' | 'click' | 'focusin';
  data: string;
}
