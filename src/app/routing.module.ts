import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AddBookmarkComponent } from './components/add-bookmark/add-bookmark.component';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { NotFoundComponent } from './components/404/not-found.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { AddGroupComponent } from './components/add-group/add-group.component';

const routes: Routes = [
  { path: '', redirectTo: 'bookmarks', pathMatch: 'full' },
  { path: 'bookmarks', component: BookmarkListComponent },
  { path: 'add-bookmark', component: AddBookmarkComponent },
  { path: 'groups', component: GroupListComponent },
  { path: 'add-group', component: AddGroupComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: APP_BASE_HREF, useValue: '!' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class RoutingModule { }
