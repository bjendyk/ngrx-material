import { Directive } from '@angular/core';
import { AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { GroupService } from '../../services/group.service';

export function existingNameValidator(groupService: GroupService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const debounceTime = 200;
    return new Promise((resolve) => {
      groupService.getGroupsByName(control.value)
        .pipe(debounce(() => timer(debounceTime)))
        .subscribe(result => {
          resolve(result && result.length > 0 ? { exists: true } : null);
      });
    });
  };
}

@Directive({
  selector: '[appGroupNameValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: GroupNameValidator, multi: true}]
})
export class GroupNameValidator implements AsyncValidator {
  constructor(private groupService: GroupService) {  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return existingNameValidator(this.groupService)(control);
  }
}
