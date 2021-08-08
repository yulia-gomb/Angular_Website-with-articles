import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';

@Injectable()
export class SendingEffects {
  constructor(private actions$: Actions) {
  }
}
