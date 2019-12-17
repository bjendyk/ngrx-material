import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Bookmark } from '../model/bookmark.entity';
import { selectAllGroups, selectFirstGroup } from '../store/selectors';
import { GroupActions } from '../store/actions';

@Injectable()
export class GroupService {
  constructor(private store: Store<{ bookmarks: Bookmark[], groups: string[] }>) { }

  getGroups() {
    return this.store.pipe(select(selectAllGroups));
  }

  getFirstGroup() {
    return this.store.pipe(select(selectFirstGroup));
  }

  createGroup(name: string) {
    this.store.dispatch(GroupActions.addGroup({ groupName: name }));
  }

  deleteBookmark(name: string) {
    this.store.dispatch(GroupActions.deleteGroup( { groupName: name }));
  }

}
