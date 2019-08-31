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

        const target = getElementByXPath(event.xpath);

        if (event.type === 'input') {
          return fromArray([...event.data]).pipe(
            concatMap((char: string) => of(char).pipe(delay(300))),
            tap((char: string) => (target as HTMLInputElement).value += char),
          );
        }

        if (event.type === 'click') {
          target.dispatchEvent(new Event('click'));
        }

        if (event.type === 'focusin') {
          target.dispatchEvent(new Event('focusin'));
        }

        return of();
      }),
      map(() => {
      }),
    );
  }
}

function getElementByXPath(path) {
  return (new XPathEvaluator())
    .evaluate(path, document.documentElement, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue;
}
