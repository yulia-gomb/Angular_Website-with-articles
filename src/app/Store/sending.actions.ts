import {createAction, props} from "@ngrx/store";

export namespace SendingActions {

  export const sendingFormDataForPreview = createAction(
    'SENDING_DATA_FOR_PREVIEW',
    props<{ title?: string,
      img?: any,
      subtitles?: string[],
      text?: string[],
      author?: string | null,
      date?: string,
      tags?: string[]
    }>()
  );

}




