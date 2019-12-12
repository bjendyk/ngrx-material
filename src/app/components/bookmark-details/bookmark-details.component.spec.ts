import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { Bookmark } from '../../model/bookmark.entity';
import { BookmarkDetailsComponent } from './bookmark-details.component';
import { Group } from '../../model/group.enum';
import { LibraryImportsModule } from '../../library-imports.module';

describe('BookmarkDetailsComponent', () => {
  let component;
  let dialogResult;
  let fixture;

  const bookmark: Bookmark = {
    name: 'bookmark',
    url: 'http://bookmark.com',
    group: Group.Personal
  } as Bookmark;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ LibraryImportsModule, NoopAnimationsModule ],
      declarations: [ BookmarkDetailsComponent ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(BookmarkDetailsComponent);
      component = fixture.componentInstance;
      component.bookmark = bookmark;
      fixture.detectChanges();

      spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () => of(dialogResult)
      });

      spyOn(component.delete, 'emit');
    });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the output event if the dialog result is `true`', () => {
    dialogResult = true;
    component.onDelete(bookmark);
    expect(component.delete.emit).toHaveBeenCalledWith(bookmark);
  });

  it('it should not emit the output event if the dialog result is `false`', () => {
    dialogResult = false;
    component.onDelete(bookmark);
    expect(component.delete.emit).not.toHaveBeenCalled();
  });
});
