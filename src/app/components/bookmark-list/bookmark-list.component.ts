import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

import { Bookmark } from '../../model/bookmark.entity';
import { BookmarkService } from '../../services/bookmark.service';
import { Constants } from '../../constants/constants';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
})
export class BookmarkListComponent implements OnInit {
  bookmarks$: Observable<Bookmark[]>;
  groups$: Observable<string[]>;
  currentGroup: string;

  constructor(private bookmarkService: BookmarkService,
              private groupService: GroupService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.groupService.getFirstGroup().subscribe((group) => {
      this.currentGroup = group;
    });
    this.groups$ = this.groupService.getGroups(true);
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
