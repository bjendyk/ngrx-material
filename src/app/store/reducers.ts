import { createReducer, on } from '@ngrx/store';

import { Bookmark } from '../model/bookmark.entity';
import { BookmarkActions, GroupActions } from './actions';

export interface State {
  bookmarks: Bookmark[];
  groups: string[];
}

export const initialState: State = {
  bookmarks: [
    {
      name: 'Suzuki SV650',
      url: 'https://en.wikipedia.org/wiki/Suzuki_SV650',
      group: 'Leisure'
    },
    {
      name: 'Wakacje.pl',
      url: 'https://wakacje.pl',
      group: 'Leisure'
    },
    {
      name: 'Gmail',
      url: 'https://gmail.com',
      group: 'Personal'
    },
    {
      name: 'Proton Mail',
      url: 'https://protonmail.ch',
      group: 'Personal'
    },
    {
      name: 'Coders Lab',
      url: 'https://coderslab.pl',
      group: 'Work'
    },
    {
      name: 'Onwelo',
      url: 'https://onwelo.com',
      group: 'Work'
    },
    {
      name: 'Angular',
      url: 'https://angular.io',
      group: 'Work'
    },
    {
      name: 'Angular Material',
      url: 'https://material.angular.io',
      group: 'Work'
    }
  ],
  groups: [
    'Work', 'Leisure', 'Personal'
  ]
};

export function bookmarkReducer(appState, action) {
  const reducer = createReducer(initialState,
    on(BookmarkActions.addBookmark, (state, { bookmark }) => ({
        ...state,
        bookmarks: [...state.bookmarks, bookmark]
      })
    ),
    on(BookmarkActions.deleteBookmark, (state, { name }) => ({
        ...state,
        bookmarks: state.bookmarks.filter(item => item.name !== name)
      })
    ),
    on(BookmarkActions.clearBookmarkGroup, (state, { groupName }) => ({
        ...state,
        bookmarks: state.bookmarks.map((bookmark) => {
          if (bookmark.group === groupName) {
            return {
              name: bookmark.name,
              url: bookmark.url,
              group: ''
            };
          }
          return bookmark;
        }),
      })
    )
  );
  return reducer(appState, action);
}

export function groupReducer(appState, action) {
  const reducer = createReducer(initialState,
    on(GroupActions.addGroup, (state, { groupName }) => ({
        ...state,
        groups: [...state.groups, groupName]
      })
    ),
    on(GroupActions.deleteGroup, (state, { groupName }) => ({
          ...state,
          groups: state.groups.filter(item => item !== groupName)
      })
    )
  );
  return reducer(appState, action);
}
