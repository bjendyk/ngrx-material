import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';

import { GroupNameValidator } from './group-name-validator.directive';
import { GroupService } from '../../services/group.service';

describe('GroupNameValidator', () => {
  let svc;
  let ctrl;
  let groupServiceStub;

  beforeEach(() => {
    groupServiceStub = jasmine.createSpyObj('GroupService', ['getGroupsByName']);
    svc = new GroupNameValidator(groupServiceStub as GroupService);
    ctrl = null;
  });

  describe('validate()', () => {
    it('should return a promise', () => {
      ctrl = { value: 'abc' } as AbstractControl;
      groupServiceStub.getGroupsByName.and.returnValue(of(['abc']));
      const result = svc.validate(ctrl);
      expect(typeof result).toEqual('object');
      expect(result.then).toBeDefined();
    });

    it('should return a promise that resolves to null if the group name is unique', () => {
      ctrl = { value: 'abc' } as AbstractControl;
      groupServiceStub.getGroupsByName.and.returnValue(of([]));
      svc.validate(ctrl).then((result) => {
        expect(result).toBeNull();
      });
    });

    it('should return a promise that resolves to validation error if the group name exists', () => {
      ctrl = { value: 'abc' } as AbstractControl;
      groupServiceStub.getGroupsByName.and.returnValue(of(['abc']));
      svc.validate(ctrl).then((result) => {
        expect(result).toEqual({ exists: true });
      });
    });
  });
});
