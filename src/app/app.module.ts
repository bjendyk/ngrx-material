import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { RoutingModule } from './routing.module';
import { LibraryImportsModule } from './library-imports.module';

import { AddBookmarkComponent } from './components/add-bookmark/add-bookmark.component';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { AppComponent } from './app.component';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { BookmarkDetailsComponent } from './components/bookmark-details/bookmark-details.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/404/not-found.component';

import { BookmarkService } from './services/bookmark.service';
import { GroupService } from './services/group.service';
import { bookmarkReducer, groupReducer } from './store/reducers';
import { ExistingNameDirective } from './directives/validators/existing-name.directive';

@NgModule({
  declarations: [
    AddBookmarkComponent,
    AddGroupComponent,
    AppComponent,
    BookmarkListComponent,
    BookmarkDetailsComponent,
    ConfirmationDialogComponent,
    GroupListComponent,
    NavbarComponent,
    NotFoundComponent,
    ExistingNameDirective
  ],
  providers: [BookmarkService, GroupService],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LibraryImportsModule,
    RoutingModule,
    StoreModule.forRoot({
      bookmarks: bookmarkReducer,
      groups: groupReducer
    }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
