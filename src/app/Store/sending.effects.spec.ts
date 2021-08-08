import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {SendingEffects} from 'src/app/Store/sending.effects';

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: SendingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SendingEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SendingEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
