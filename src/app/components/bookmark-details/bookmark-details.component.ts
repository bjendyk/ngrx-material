import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { Bookmark } from '../../model/bookmark.entity';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'app-bookmark-details',
  templateUrl: './bookmark-details.component.html',
  styleUrls: ['./bookmark-details.component.scss'],
})
export class BookmarkDetailsComponent extends AbstractComponent {
  @Input() bookmark: Bookmark;
  @Output() delete = new EventEmitter<Bookmark>();

  constructor(private dialog: MatDialog, translate: TranslateService) {
    super(translate);
  }

  onDelete(bookmark) {
    const dialogData = {
      data: {
        entityName: bookmark.name,
        entityType: ''
      }
    };
    this.translate.get('COMMON.ENTITY_TYPES.BOOKMARK').subscribe((entityType) => {
      dialogData.data.entityType = entityType;

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogData);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.delete.emit(bookmark);
        }
      });
    });
  }
}
