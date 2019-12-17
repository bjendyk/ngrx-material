import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { BookmarkService } from '../../services/bookmark.service';
import { Constants } from '../../constants/constants';
import { GroupService } from '../../services/group.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit {
  name: string;
  url: string;
  selectedGroup: string;
  groups$: Observable<string[]>;

  constructor(private bookmarkService: BookmarkService,
              private groupService: GroupService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.groups$ = this.groupService.getGroups();
  }

  onCreate() {
    this.bookmarkService.createBookmark(this.name, this.url, this.selectedGroup);
    this.router.navigateByUrl('/bookmarks');
    this.snackBar.open('Bookmark created.', 'OK', { duration: Constants.SNACKBAR_TIMEOUT });
  }

  onCancel() {
    this.router.navigateByUrl('/bookmarks');
  }
}
