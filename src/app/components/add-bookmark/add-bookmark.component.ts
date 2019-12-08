import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { BookmarkService } from '../../services/bookmark.service';
import { Constants } from '../../constants/constants';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.css']
})
export class AddBookmarkComponent implements OnInit {
  name: string;
  url: string;
  selectedGroup: string;
  groups: string[];

  constructor(private bookmarkService: BookmarkService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.groups = BookmarkService.getGroupNames();
  }

  onCreate() {
    this.bookmarkService.createBookmark(this.name, this.url, this.selectedGroup);
    this.router.navigateByUrl('/bookmarks').then(() => {
      this.snackBar.open('Bookmark created.', 'OK', { duration: Constants.SNACKBAR_TIMEOUT });
    });
  }

  onCancel() {
    this.router.navigateByUrl('/bookmarks');
  }
}
