import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Bookmark } from '../../model/bookmark.entity';
import { BookmarkService } from '../../services/bookmark.service';
import { Constants } from '../../constants/constants';
import { Group } from '../../model/group.enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
})
export class BookmarkListComponent implements OnInit {
  bookmarks$: Observable<Array<Bookmark>>;
  groups: string[];
  currentGroup: string;

  constructor(private bookmarkService: BookmarkService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.currentGroup = Group.Work;
    this.groups = this.bookmarkService.getGroupNames();
    this.getBookmarks();
  }

  onTabChange(event) {
    this.currentGroup = event.tab.textLabel;
    this.getBookmarks();
  }

  onDelete(bookmark: Bookmark) {
    this.bookmarkService.deleteBookmark(bookmark.name);
    this.snackBar.open('Bookmark deleted.', 'OK', { duration: Constants.SNACKBAR_TIMEOUT });
  }

  getBookmarks() {
    this.bookmarks$ = this.bookmarkService.getBookmarks(this.currentGroup);
  }
}
