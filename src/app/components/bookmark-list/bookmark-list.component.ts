import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { Bookmark } from '../../model/bookmark.entity';
import { BookmarkService } from '../../services/bookmark.service';
import { Constants } from '../../constants/constants';
import { GroupService } from '../../services/group.service';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
})
export class BookmarkListComponent extends AbstractComponent implements OnInit {
  bookmarks$: Observable<Bookmark[]>;
  groups: string[];
  currentGroup: string;

  constructor(private bookmarkService: BookmarkService,
              private groupService: GroupService,
              private snackBar: MatSnackBar,
              translate: TranslateService) {
    super(translate);
  }

  ngOnInit() {
    this.groupService.getGroups(true).subscribe((groups) => {
      this.groups = groups;
      this.currentGroup = groups[0];
      this.getBookmarks(0);
    });
  }

  onTabChange(event) {
    this.currentGroup = event.tab.textLabel;
    this.getBookmarks(event.index);
  }

  onDelete(bookmark: Bookmark) {
    this.bookmarkService.deleteBookmark(bookmark.name);
    this.translate.get('BOOKMARK_LIST.BOOKMARK_DELETED').subscribe((result) => {
      this.snackBar.open(result, 'OK', { duration: Constants.SNACKBAR_TIMEOUT });
    });
  }

  getBookmarks(groupIndex: number) {
    const isUnassignedGroup = groupIndex === this.groups.length - 1;
    this.bookmarks$ = this.bookmarkService.getBookmarks(isUnassignedGroup ? 'unassigned' : this.currentGroup);
  }
}
