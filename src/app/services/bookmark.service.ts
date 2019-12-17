import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Bookmark } from '../model/bookmark.entity';
import { BookmarkActions } from '../store/actions';
import { selectBookmarks } from '../store/selectors';

@Injectable()
export class BookmarkService {

  constructor(private store: Store<{ bookmarks: Bookmark[], groups: string[] }>) { }

  getBookmarks(group: string) {
    return this.store.pipe(select(selectBookmarks, { group }));
  }

  deleteBookmark(name: string) {
    this.store.dispatch(BookmarkActions.deleteBookmark( { name }));
  }

  createBookmark(name: string, url: string, group: string) {
    const bookmark: Bookmark = { name, url, group } as Bookmark;
    this.store.dispatch(BookmarkActions.addBookmark({ bookmark }));
  }
}
