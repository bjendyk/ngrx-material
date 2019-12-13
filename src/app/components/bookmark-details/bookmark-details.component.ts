import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Bookmark } from '../../model/bookmark.entity';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-bookmark-details',
  templateUrl: './bookmark-details.component.html',
  styleUrls: ['./bookmark-details.component.scss'],
})
export class BookmarkDetailsComponent {
  @Input() bookmark: Bookmark;
  @Output() delete = new EventEmitter<Bookmark>();

  constructor(private dialog: MatDialog) { }

  onDelete(bookmark) {
    const dialogData = {
      data: {
        bookmarkName: bookmark.name
      }
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogData);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete.emit(bookmark);
      }
    });
  }
}
