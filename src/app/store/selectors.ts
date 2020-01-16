import { createSelector } from '@ngrx/store';
import { State } from './reducers';

const unassigned = 'unassigned';

export const selectAllBookmarks = (state: State) => state.bookmarks;

export const selectBookmarks = createSelector(
  selectAllBookmarks,
  (state: any, props) => {
    if (props.group) {
      if (props.group === unassigned) {
        return state.bookmarks.filter(item => item.group === '');
      }
      return state.bookmarks.filter(item => item.group === props.group);
    }
    return state.bookmarks;
  });

export const allGroups = (state: State) => state.groups;

export const selectAllGroups = createSelector(allGroups, (state: any, props) => {
  if (props.includeUnassigned) {
    return [...state.groups, unassigned];
  }
  return state.groups;
});

export const selectGroupByName = createSelector(allGroups, (state: any, props) => {
  if (props.name) {
    return [...state.groups, unassigned].filter(item => item.toLowerCase() === props.name.toLowerCase());
  }
  return null;
});
