import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { AddBookmarkComponent } from './add-bookmark.component';
import { BookmarkService } from '../../services/bookmark.service';
import { LibraryImportsModule } from '../../library-imports.module';
import { GroupService } from '../../services/group.service';

const bookmarkServiceStub = jasmine.createSpyObj('BookmarkService', ['getGroupNames', 'createBookmark']);

const groupServiceStub = jasmine.createSpyObj('GroupService', ['getGroups', 'getFirstGroup']);
groupServiceStub.getGroups.and.returnValue(of(['Personal', 'Work', 'Leisure']));

const routerStub = jasmine.createSpyObj('Router', ['navigateByUrl']);
const snackBarStub = jasmine.createSpyObj('MatSnackBar', ['open']);

describe('AddBookmarkComponent', () => {
  let component;
  let fixture;
  let el;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ LibraryImportsModule, NoopAnimationsModule, TranslateModule.forRoot() ],
      declarations: [ AddBookmarkComponent ],
      providers: [
        { provide: BookmarkService, useValue: bookmarkServiceStub },
        { provide: GroupService, useValue: groupServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: MatSnackBar, useValue: snackBarStub },
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AddBookmarkComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      el = fixture.debugElement;
    });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should set the `groups$` observable', () => {
    component.groups$.subscribe((result) => {
      expect(result.length).toEqual(3);
      expect(result[0]).toEqual('Personal');
      expect(result[1]).toEqual('Work');
      expect(result[2]).toEqual('Leisure');
    });
  });

  it('onCancel() should navigate to `/bookmarks` path', () => {
    component.onCancel();
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/bookmarks');
  });

  it('onCreate() should call `BookmarkService.createBookmark(), display the snack bar notification and navigate to `/bookmarks`',
    () => {
    component.onCreate();
    expect(bookmarkServiceStub.createBookmark).toHaveBeenCalled();
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/bookmarks');
    expect(snackBarStub.open).toHaveBeenCalled();
  });
});
