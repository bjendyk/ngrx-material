import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { GroupService } from '../../services/group.service';
import { Constants } from '../../constants/constants';

const groupsUrl = '/groups';

@Component({
  selector: 'app-add-group',
  templateUrl: 'add-group.component.html',
  styleUrls: ['add-group-component.scss']
})
export class AddGroupComponent {
  name: string;

  constructor(private groupService: GroupService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  onCreate() {
    this.groupService.createGroup(this.name);
    this.router.navigateByUrl(groupsUrl);
    this.snackBar.open('Group created.', 'OK', { duration: Constants.SNACKBAR_TIMEOUT });
  }

  onCancel() {
    this.router.navigateByUrl(groupsUrl);
  }
}
