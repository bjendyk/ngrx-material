import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Bookmark } from '../model/bookmark.entity';
import { selectAllGroups, selectGroupByName } from '../store/selectors';
import { BookmarkActions, GroupActions } from '../store/actions';

@Injectable()
export class GroupService {
  constructor(private store: Store<{ bookmarks: Bookmark[], groups: string[] }>) { }

  getGroups(includeUnassigned: boolean) {
    return this.store.pipe(select(selectAllGroups, { includeUnassigned }));
  }

  getGroupsByName(name: string) {
    return this.store.pipe(select(selectGroupByName, { name }));
  }

  createGroup(name: string) {
    this.store.dispatch(GroupActions.addGroup({ groupName: name }));
  }

  deleteGroup(name: string) {
    this.store.dispatch(BookmarkActions.clearBookmarkGroup({ groupName: name }));
    this.store.dispatch(GroupActions.deleteGroup( { groupName: name }));
  }
}
