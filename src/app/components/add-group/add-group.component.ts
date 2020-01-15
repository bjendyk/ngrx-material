import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { GroupService } from '../../services/group.service';
import { Constants } from '../../constants/constants';
import { AbstractComponent } from '../abstract/abstract.component';

const groupsUrl = '/groups';

@Component({
  selector: 'app-add-group',
  templateUrl: 'add-group.component.html',
  styleUrls: ['add-group-component.scss']
})
export class AddGroupComponent extends AbstractComponent {
  name: string;

  constructor(private groupService: GroupService,
              private router: Router,
              private snackBar: MatSnackBar,
              translate: TranslateService) {
    super(translate);
  }

  onCreate() {
    this.groupService.createGroup(this.name);
    this.router.navigateByUrl(groupsUrl);
    this.translate.get('ADD_GROUP.GROUP_CREATED').subscribe((result) => {
      this.snackBar.open(result, 'OK', { duration: Constants.SNACKBAR_TIMEOUT });
    });
  }

  onCancel() {
    this.router.navigateByUrl(groupsUrl);
  }
}
