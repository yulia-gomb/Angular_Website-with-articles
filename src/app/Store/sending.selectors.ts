import {createFeatureSelector, createSelector} from "@ngrx/store";
import {State} from "./sending.reducer";

export namespace SendingSelectors {

  export const state = createFeatureSelector<State>("sending");

  export const img = createSelector(state, (state) => state.img);
  export const title = createSelector(state, (state) => state.title);
  export const subtitles = createSelector(state, (state) => state.subtitles);
  export const text = createSelector(state, (state) => state.text);
  export const author = createSelector(state, (state) => state.author);
  export const date = createSelector(state, (state) => state.date);
  export const tags = createSelector(state, (state) => state.tags);
  export const formWasFilled = createSelector(state, (state) => state.formWasFilled);

}
