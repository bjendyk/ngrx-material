import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { GroupService } from '../../services/group.service';
import { Constants } from '../../constants/constants';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups$: Observable<string[]>;

  constructor(private groupService: GroupService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.groups$ = this.groupService.getGroups(false);
  }

  onDelete(groupName: string) {
    const dialogData = {
      data: {
        entityName: groupName,
        entityType: 'group'
      }
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogData);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.groupService.deleteGroup(groupName);
        this.snackBar.open('Group deleted.', 'OK', { duration: Constants.SNACKBAR_TIMEOUT });
      }
    });
  }
}
