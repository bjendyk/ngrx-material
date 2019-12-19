import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../model/bookmark.entity';

const addBookmark = createAction('[Bookmark] add bookmark', props<{ bookmark: Bookmark }>());
const deleteBookmark = createAction('[Bookmark] delete bookmark', props<{ name: string }>());
const clearBookmarkGroup = createAction(`[Bookmark] clear bookmarks' group`, props<{ groupName: string }>());

export const BookmarkActions = {
  addBookmark,
  deleteBookmark,
  clearBookmarkGroup
};

const addGroup = createAction('[Group] add group', props<{ groupName: string }>());
const deleteGroup = createAction('[Group] delete group', props<{ groupName: string }>());

export const GroupActions = {
  addGroup,
  deleteGroup
};
