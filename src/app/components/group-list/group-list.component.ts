import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { GroupService } from '../../services/group.service';
import { Constants } from '../../constants/constants';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent extends AbstractComponent implements OnInit {
  groups$: Observable<string[]>;

  constructor(private groupService: GroupService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              translate: TranslateService) {
    super(translate);
  }

  ngOnInit() {
    this.groups$ = this.groupService.getGroups(false);
  }

  onDelete(groupName: string) {
    const dialogData = {
      data: {
        entityName: groupName,
        entityType: ''
      }
    };
    this.translate.get('COMMON.ENTITY_TYPES.GROUP').subscribe((entityType) => {
      dialogData.data.entityType = entityType;

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogData);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.groupService.deleteGroup(groupName);
          this.translate.get('GROUP_LIST.GROUP_DELETED').subscribe((message) => {
            this.snackBar.open(message, 'OK', { duration: Constants.SNACKBAR_TIMEOUT });
          });
        }
      });
    });
  }
}
