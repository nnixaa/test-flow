import { EventReplayer } from 'preboot';
import { Observable, of } from 'rxjs';
import { concatMap, delay, finalize, map, tap } from 'rxjs/operators';
import { fromArray } from 'rxjs/internal/observable/fromArray';

import { RecordedEvent } from './model';


export class Replayer extends EventReplayer {
  replay(events: RecordedEvent[]): Observable<void> {
    let resetStyles;
    return fromArray(events).pipe(
      // delay each item
      concatMap((event: RecordedEvent) => of(event).pipe(delay(500))),
      concatMap((event: RecordedEvent) => {

        if (resetStyles) {
          resetStyles();
        }

        const target: HTMLElement = getElementByXPath(event.xpath) as HTMLElement;

        const oldShadow = target.style.boxShadow;
        target.style.boxShadow = '0px 0px 0px 4px red';
        resetStyles = () => {
          target.style.boxShadow = oldShadow;
        };


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
      finalize(() => {

        if (resetStyles) {
          resetStyles();
        }
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
