import { createSelector } from '@ngrx/store';
import { State } from './reducers';

export const selectAllBookmarks = (state: State) => state.bookmarks;

export const selectBookmarks = createSelector(
  selectAllBookmarks,
  (state: any, props) => {
    if (props.group) {
      return state.bookmarks.filter(item => item.group === props.group);
    }
    return state.bookmarks;
  });
