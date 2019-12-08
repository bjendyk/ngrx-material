import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../model/bookmark.entity';

const addBookmark = createAction('[Bookmark] add bookmark', props<{ bookmark: Bookmark }>());
const deleteBookmark = createAction('[Bookmark] delete bookmark', props<{ name: string }>());

export const BookmarkActions = {
  addBookmark,
  deleteBookmark
};
