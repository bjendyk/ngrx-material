import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Bookmark } from '../../model/bookmark';
import { BookmarkService } from '../../services/bookmark.service';
import { Constants } from '../../constants/constants';
import { Group } from '../../model/group.enum';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.css'],
})
export class BookmarkListComponent implements OnInit {
  bookmarks: Array<Bookmark>;
  groups: string[];
  currentGroup: string;

  constructor(private bookmarkService: BookmarkService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.currentGroup = Group.Work;
    this.bookmarks = this.bookmarkService.getBookmarks(this.currentGroup);
    this.groups = this.bookmarkService.getGroupNames();
  }

  onTabChange(event) {
    this.currentGroup = event.tab.textLabel;
    this.bookmarks = this.bookmarkService.getBookmarks(this.currentGroup);
  }

  onDelete(bookmark: Bookmark) {
    this.bookmarkService.deleteBookmark(bookmark.name);
    this.bookmarks = this.bookmarkService.getBookmarks(this.currentGroup);
    this.snackBar.open('Bookmark deleted.', 'OK', { duration: Constants.SNACKBAR_TIMEOUT });
  }
}
