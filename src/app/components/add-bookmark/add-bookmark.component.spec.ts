import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AddBookmarkComponent } from './add-bookmark.component';
import { BookmarkService } from '../../services/bookmark.service';
import { LibraryImportsModule } from '../../library-imports.module';

const bookmarkServiceStub = jasmine.createSpyObj('BookmarkService', ['getGroupNames', 'createBookmark']);
bookmarkServiceStub.getGroupNames.and.returnValue(['group_1', 'group_2']);

const routerStub = jasmine.createSpyObj('Router', ['navigateByUrl']);
const snackBarStub = jasmine.createSpyObj('MatSnackBar', ['open']);

describe('AddBookmarkComponent', () => {
  let component;
  let fixture;
  let el;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ LibraryImportsModule, NoopAnimationsModule ],
      declarations: [ AddBookmarkComponent ],
      providers: [
        { provide: BookmarkService, useValue: bookmarkServiceStub },
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

  it('ngOnInit() should set the `groups` member', () => {
    expect(bookmarkServiceStub.getGroupNames).toHaveBeenCalled();
    expect(component.groups.length).toEqual(2);
    expect(component.groups[0]).toEqual('group_1');
    expect(component.groups[1]).toEqual('group_2');
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
