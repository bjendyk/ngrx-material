import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';

import { NavbarComponent } from './navbar.component';
import { LibraryImportsModule } from '../../library-imports.module';

const breakpointObserverStub = jasmine.createSpyObj('BreakpointObserver', ['observe']);
breakpointObserverStub.observe.and.returnValue({
  pipe: () => of(true)
});

describe('NavbarComponent', () => {
  let component;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        NoopAnimationsModule,
        LibraryImportsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: BreakpointObserver, useValue: breakpointObserverStub }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('isHandset$ should resolve to true', () => {
    component.isHandset$.subscribe((result) => {
      expect(result).toBe(true);
    });
  });
});
