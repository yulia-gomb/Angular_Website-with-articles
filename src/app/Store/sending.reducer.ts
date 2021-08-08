import {Action, createReducer, on} from '@ngrx/store';
import {SendingActions} from "./sending.actions";

export interface State {
  title?: string;
  img?: any;
  subtitles?: string[];
  text?: string[];
  author?: string | null;
  date?: string;
  tags?: string[];
}

const initialState: State = {
  title: '',
  img: '',
  subtitles: [],
  text: [],
  author: '',
  date: '',
  tags: [],
}

export const sendingReducer = createReducer(
  initialState,
  on(SendingActions.sendingFormDataForPreview, (state,
                                                {title, img, subtitles, text, author, date, tags}) => ({
    ...state,
    title: title,
    img: img,
    subtitles: subtitles,
    text: text,
    author: author,
    date: date,
    tags: tags
}))
);

export function reducer(state: State | undefined, action: Action) {
  return sendingReducer(state, action);
}


