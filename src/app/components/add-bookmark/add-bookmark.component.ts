import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { BookmarkService } from '../../services/bookmark.service';
import { Constants } from '../../constants/constants';
import { GroupService } from '../../services/group.service';
import { AbstractComponent } from '../abstract/abstract.component';

const bookmarksUrl = '/bookmarks';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent extends AbstractComponent implements OnInit {
  name: string;
  url: string;
  selectedGroup: string;
  groups$: Observable<string[]>;

  constructor(private bookmarkService: BookmarkService,
              private groupService: GroupService,
              private router: Router,
              private snackBar: MatSnackBar,
              translate: TranslateService) {
    super(translate);
  }

  ngOnInit() {
    this.groups$ = this.groupService.getGroups(false);
  }

  onCreate() {
    this.bookmarkService.createBookmark(this.name, this.url, this.selectedGroup);
    this.router.navigateByUrl(bookmarksUrl);
    this.translate.get('ADD_NEW_BOOKMARK.BOOKMARK_CREATED').subscribe((result) => {
      this.snackBar.open(result, 'OK', { duration: Constants.SNACKBAR_TIMEOUT });
    });
  }

  onCancel() {
    this.router.navigateByUrl(bookmarksUrl);
  }
}
