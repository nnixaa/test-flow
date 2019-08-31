export interface RecordedEvent {
  xpath: string;
  type: 'input' | 'click' | 'focusin';
  data: string;
}
