import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { BookmarkListComponent } from './bookmark-list.component';
import { LibraryImportsModule } from '../../library-imports.module';
import { Bookmark } from '../../model/bookmark.entity';
import { BookmarkService } from '../../services/bookmark.service';
import { BookmarkDetailsComponent } from '../bookmark-details/bookmark-details.component';
import { GroupService } from '../../services/group.service';

const bookmarks: Bookmark[] = [
  {
    name: 'bookmark 1',
    url: 'url 1',
    group: 'Personal'
  },
  {
    name: 'bookmark 2',
    url: 'url 2',
    group: 'Leisure'
  },
  {
    name: 'bookmark 3',
    url: 'url 3',
    group: 'Work'
  }
];

const bookmarkServiceStub = jasmine.createSpyObj('BookmarkService', ['getBookmarks', 'deleteBookmark', 'getGroupNames']);
bookmarkServiceStub.getBookmarks.and.returnValue(of(bookmarks));

const groupServiceStub = jasmine.createSpyObj('GroupService', ['getGroups']);
groupServiceStub.getGroups.and.returnValue(of(['Personal', 'Work', 'Leisure', 'unassigned']));

describe('BookmarkListComponent', () => {
  let component;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, LibraryImportsModule, RouterTestingModule, TranslateModule.forRoot() ],
      declarations: [ BookmarkDetailsComponent, BookmarkListComponent ],
      providers: [
        { provide: BookmarkService, useValue: bookmarkServiceStub },
        { provide: GroupService, useValue: groupServiceStub }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(BookmarkListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      spyOn(component.snackBar, 'open');
    });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should initialize the component data', () => {
    expect(component.groups[0]).toEqual('Personal');
    expect(component.groups[1]).toEqual('Work');
    expect(component.groups[2]).toEqual('Leisure');
    expect(component.groups[3]).toEqual('unassigned');
    expect(component.currentGroup).toEqual('Personal');

    component.bookmarks$.subscribe((result) => {
      expect(result.length).toEqual(3);
      expect(result[0].name).toEqual('bookmark 1');
      expect(result[1].name).toEqual('bookmark 2');
      expect(result[2].name).toEqual('bookmark 3');
    });
  });

  describe('getBookmarks()', () => {
    beforeEach(() => {
      bookmarkServiceStub.getBookmarks.calls.reset();
    });

    it('should set the bookmarks$ observable', () => {
      component.bookmarks$ = undefined;
      component.getBookmarks(0);

      expect(bookmarkServiceStub.getBookmarks).toHaveBeenCalledWith(component.currentGroup);
      expect(component.bookmarks$).toBeDefined();

      component.bookmarks$.subscribe((result) => {
        expect(result.length).toEqual(3);
        expect(result[0].name).toEqual('bookmark 1');
        expect(result[1].name).toEqual('bookmark 2');
        expect(result[2].name).toEqual('bookmark 3');
      });
    });

    it('should pass the string `unassigned` if the group index equals the last group', () => {
      console.log(component.groups);
      component.getBookmarks(3);
      expect(bookmarkServiceStub.getBookmarks).toHaveBeenCalledWith('unassigned');
    });
  });

  it('onDelete() should call BookmarkService.deleteBookmark() and display the snack bar notification', () => {
    const bookmark: Bookmark = { name: 'abc' } as Bookmark;
    component.onDelete(bookmark);
    expect(bookmarkServiceStub.deleteBookmark).toHaveBeenCalledWith('abc');
    expect(component.snackBar.open).toHaveBeenCalled();
  });

  it('onTabChange() should update currentGroup and bookmarks$ members', () => {
    const event = {
      tab: {
        textLabel: 'xyz'
      }
    };
    component.currentGroup = '';
    component.bookmarks$ = undefined;
    component.onTabChange(event);

    expect(component.currentGroup).toEqual('xyz');
    expect(component.bookmarks$).toBeDefined();

    component.bookmarks$.subscribe((result) => {
      expect(result.length).toEqual(3);
      expect(result[0].name).toEqual('bookmark 1');
      expect(result[1].name).toEqual('bookmark 2');
      expect(result[2].name).toEqual('bookmark 3');
    });
  });
});
