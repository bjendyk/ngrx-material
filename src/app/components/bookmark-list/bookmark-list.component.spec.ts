import { async, TestBed } from '@angular/core/testing';
import { Directive, HostListener, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { BookmarkListComponent } from './bookmark-list.component';
import { LibraryImportsModule } from '../../library-imports.module';
import { Bookmark } from '../../model/bookmark.entity';
import { Group } from '../../model/group.enum';
import { BookmarkService } from '../../services/bookmark.service';
import { BookmarkDetailsComponent } from '../bookmark-details/bookmark-details.component';

@Directive({
  selector: '[routerLink]' // tslint:disable-line
})
export class RouterLinkDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

const bookmarks: Bookmark[] = [
  {
    name: 'bookmark 1',
    url: 'url 1',
    group: Group.Personal
  },
  {
    name: 'bookmark 2',
    url: 'url 2',
    group: Group.Leisure
  },
  {
    name: 'bookmark 3',
    url: 'url 3',
    group: Group.Work
  }
];

const bookmarkServiceStub = jasmine.createSpyObj('BookmarkService', ['getBookmarks', 'deleteBookmark', 'getGroupNames']);
bookmarkServiceStub.getBookmarks.and.returnValue(of(bookmarks));
bookmarkServiceStub.getGroupNames.and.returnValue([Group.Work, Group.Leisure, Group.Personal]);

describe('BookmarkListComponent', () => {
  let component;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, LibraryImportsModule, RouterTestingModule ],
      declarations: [ BookmarkDetailsComponent, BookmarkListComponent ],
      providers: [
        { provide: RouterLink, useClass: RouterLinkDirective },
        { provide: BookmarkService, useValue: bookmarkServiceStub }
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
    expect(component.currentGroup).toEqual(Group.Work);
    expect(typeof component.groups).toBe('object');
    expect(component.groups.length).toEqual(3);
    expect(bookmarkServiceStub.getBookmarks).toHaveBeenCalled();

    component.bookmarks$.subscribe((result) => {
      expect(result.length).toEqual(3);
      expect(result[0].name).toEqual('bookmark 1');
      expect(result[1].name).toEqual('bookmark 2');
      expect(result[2].name).toEqual('bookmark 3');
    });
  });

  it('getBookmarks() should set the bookmarks$ observable', () => {
    component.bookmarks$ = undefined;
    component.getBookmarks();

    expect(bookmarkServiceStub.getBookmarks).toHaveBeenCalledWith(component.currentGroup);
    expect(component.bookmarks$).toBeDefined();

    component.bookmarks$.subscribe((result) => {
      expect(result.length).toEqual(3);
      expect(result[0].name).toEqual('bookmark 1');
      expect(result[1].name).toEqual('bookmark 2');
      expect(result[2].name).toEqual('bookmark 3');
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
