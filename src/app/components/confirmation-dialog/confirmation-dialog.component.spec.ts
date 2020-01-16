import { async, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

const dialogStub = jasmine.createSpyObj('MatDialogRef', ['close']);

describe('ConfirmationDialogComponent', () => {
  let component;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule, TranslateModule.forRoot() ],
      declarations: [ ConfirmationDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogStub },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ConfirmationDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with true/false result', () => {
    component.onClose(true);
    expect(dialogStub.close).toHaveBeenCalledWith(true);
    component.onClose(false);
    expect(dialogStub.close).toHaveBeenCalledWith(false);
  });
});
