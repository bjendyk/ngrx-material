import { createReducer, on } from '@ngrx/store';

import { Bookmark } from '../model/bookmark.entity';
import { BookmarkActions } from './actions';
import { Group } from '../model/group.enum';

export interface State {
  bookmarks: Array<Bookmark>;
}

export const initialState: State = {
  bookmarks: [
    {
      name: 'Suzuki SV650',
      url: 'https://en.wikipedia.org/wiki/Suzuki_SV650',
      group: Group.Leisure
    },
    {
      name: 'Wakacje.pl',
      url: 'https://wakacje.pl',
      group: Group.Leisure
    },
    {
      name: 'Gmail',
      url: 'https://gmail.com',
      group: Group.Personal
    },
    {
      name: 'Proton Mail',
      url: 'https://protonmail.ch',
      group: Group.Personal
    },
    {
      name: 'Coders Lab',
      url: 'https://coderslab.pl',
      group: Group.Work
    },
    {
      name: 'Onwelo',
      url: 'https://onwelo.com',
      group: Group.Work
    },
    {
      name: 'Angular',
      url: 'https://angular.io',
      group: Group.Work
    },
    {
      name: 'Angular Material',
      url: 'https://material.angular.io',
      group: Group.Work
    }
  ]
};

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
);

export function bookmarkReducer(state, action) {
  return reducer(state, action);
}
