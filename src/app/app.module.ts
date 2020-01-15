import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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

import { GroupNameValidator } from './directives/validators/group-name-validator.directive';

import { bookmarkReducer, groupReducer } from './store/reducers';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AddBookmarkComponent,
    AddGroupComponent,
    AppComponent,
    BookmarkListComponent,
    BookmarkDetailsComponent,
    ConfirmationDialogComponent,
    GroupListComponent,
    GroupNameValidator,
    NavbarComponent,
    NotFoundComponent
  ],
  providers: [BookmarkService, GroupService],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
