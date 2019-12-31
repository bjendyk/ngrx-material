import { createSelector } from '@ngrx/store';
import { State } from './reducers';

export const selectAllBookmarks = (state: State) => state.bookmarks;

export const selectBookmarks = createSelector(
  selectAllBookmarks,
  (state: any, props) => {
    if (props.group) {
      if (props.group === 'Unassigned') {
        return state.bookmarks.filter(item => item.group === '');
      }
      return state.bookmarks.filter(item => item.group === props.group);
    }
    return state.bookmarks;
  });

export const allGroups = (state: State) => state.groups;

export const selectAllGroups = createSelector(allGroups, (state: any, props) => {
  if (props.includeUnassigned) {
    return [...state.groups, 'Unassigned'];
  }
  return state.groups;
});

export const selectFirstGroup = createSelector(allGroups, (state: any) => {
  if (state.groups && state.groups[0]) {
    return state.groups[0];
  }
  return null;
});

export const selectGroupByName = createSelector(allGroups, (state: any, props) => {
  if (props.name) {
    return [...state.groups, 'Unassigned'].filter(item => item.toLowerCase() === props.name.toLowerCase());
  }
  return null;
});
