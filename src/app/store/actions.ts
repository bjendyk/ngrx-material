import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../model/bookmark.entity';

const addBookmark = createAction('[Bookmark] add bookmark', props<{ bookmark: Bookmark }>());
const deleteBookmark = createAction('[Bookmark] delete bookmark', props<{ name: string }>());

export const BookmarkActions = {
  addBookmark,
  deleteBookmark
};

const addGroup = createAction('[Group] add group', props<{ groupName: string }>());
const deleteGroup = createAction('[Group] delete group', props<{ groupName: string }>());

export const GroupActions = {
  addGroup,
  deleteGroup
};
