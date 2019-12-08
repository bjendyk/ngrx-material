import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../model/bookmark';

export const addBookmark = createAction('[Bookmark] add bookmark', props<{ bookmark: Bookmark }>());
export const deleteBookmark = createAction('[Bookmark] delete bookmark', props<{ bookmark: Bookmark }>());
