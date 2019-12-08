import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { RoutingModule } from './routing.module';
import { LibraryImportsModule } from './library-imports.module';

import { AddBookmarkComponent } from './components/add-bookmark/add-bookmark.component';
import { AppComponent } from './app.component';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { BookmarkDetailsComponent } from './components/bookmark-details/bookmark-details.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { BookmarkService } from './services/bookmark.service';
import { bookmarkReducer } from './store/reducers';

@NgModule({
  declarations: [
    AddBookmarkComponent,
    AppComponent,
    BookmarkListComponent,
    BookmarkDetailsComponent,
    ConfirmationDialogComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LibraryImportsModule,
    RoutingModule,
    StoreModule.forRoot({
      bookmarks: bookmarkReducer
    }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [BookmarkService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
