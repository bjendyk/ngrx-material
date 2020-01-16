import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { AddGroupComponent } from './add-group.component';
import { LibraryImportsModule } from '../../library-imports.module';
import { GroupService } from '../../services/group.service';

const groupServiceStub = jasmine.createSpyObj('GroupService', ['createGroup']);
const routerStub = jasmine.createSpyObj('Router', ['navigateByUrl']);
const snackBarStub = jasmine.createSpyObj('MatSnackBar', ['open']);

describe('AddGroupComponent', () => {
  let component;
  let fixture;
  let el;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ LibraryImportsModule, NoopAnimationsModule, TranslateModule.forRoot() ],
      declarations: [ AddGroupComponent ],
      providers: [
        { provide: GroupService, useValue: groupServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: MatSnackBar, useValue: snackBarStub },
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AddGroupComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
        el = fixture.debugElement;
      });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('onCancel() should navigate to `/groups` path', () => {
    component.onCancel();
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/groups');
  });

  it('onCreate() should call `GroupService.createGroup(), display the snack bar notification and navigate to `/groups`',
    () => {
      component.onCreate();
      expect(groupServiceStub.createGroup).toHaveBeenCalled();
      expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/groups');
      expect(snackBarStub.open).toHaveBeenCalled();
    });
});
