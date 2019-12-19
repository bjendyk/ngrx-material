import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GroupListComponent } from './group-list.component';
import { LibraryImportsModule } from '../../library-imports.module';
import { GroupService } from '../../services/group.service';

const groupServiceStub = jasmine.createSpyObj('GroupService', ['getGroups', 'deleteGroup']);
groupServiceStub.getGroups.and.returnValue(of(['Personal', 'Work', 'Leisure']));

describe('GroupListComponent', () => {
  let component;
  let fixture;
  let dialogResult;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ LibraryImportsModule, NoopAnimationsModule, RouterTestingModule ],
      declarations: [ GroupListComponent ],
      providers: [
        { provide: GroupService, useValue: groupServiceStub }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(GroupListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      spyOn(component.snackBar, 'open');
      spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () => of(dialogResult)
      });

      dialogResult = true;
    });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();

    component.groups$.subscribe((result) => {
      expect(typeof result).toBe('object');
      expect(result.length).toEqual(3);
      expect(result[0]).toEqual('Personal');
      expect(result[1]).toEqual('Work');
      expect(result[2]).toEqual('Leisure');
    });
  });

  describe('onDelete()', () => {
    it('should call GroupService.deleteGroup() and display the snack bar notification if the dialog result is positive', () => {
      const group = 'abc';
      component.onDelete(group);
      expect(groupServiceStub.deleteGroup).toHaveBeenCalledWith('abc');
      expect(component.snackBar.open).toHaveBeenCalled();
    });

    it('should not call GroupService.deleteGroup() and display the snack bar notification if the dialog result is negative', () => {
      const group = 'abc';
      dialogResult = false;
      component.onDelete(group);
      expect(groupServiceStub.deleteGroup).not.toHaveBeenCalled();
      expect(component.snackBar.open).not.toHaveBeenCalled();
    });
  });
});
