import { EventReplayer } from 'preboot';
import { Observable, of } from 'rxjs';
import { concatMap, delay, map, tap } from 'rxjs/operators';
import { fromArray } from 'rxjs/internal/observable/fromArray';

import { RecordedEvent } from './model';


export class Replayer extends EventReplayer {
  replay(events: RecordedEvent[]): Observable<void> {
    return fromArray(events).pipe(
      // delay each item
      concatMap((event: RecordedEvent) => of(event).pipe(delay(500))),
      concatMap((event: RecordedEvent) => {

        if (event.type === 'input') {
          const target: HTMLInputElement = event.target as HTMLInputElement;
          return fromArray([...event.data]).pipe(
            concatMap((char: string) => of(char).pipe(delay(300))),
            tap((char: string) => target.value += char),
          );
        }

        if (event.type === 'click') {
          event.target.dispatchEvent(event.event);
        }

        if (event.type === 'focusin') {
          event.target.dispatchEvent(event.event);
        }

        return of();
      }),
      map(() => {
      }),
    );
  }
}
