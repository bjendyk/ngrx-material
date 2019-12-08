import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { Bookmark } from '../model/bookmark';
import { addBookmark } from '../actions';
import { Group } from '../model/group.enum';

export interface State {
  bookmarks: Array<Bookmark>;
}

// export const reducers: ActionReducerMap<State> = {
//
// };


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const initialState: State = {
  bookmarks: [
    {
      name: 'xnxx',
      url: 'http://xnxx.com',
      group: Group.Leisure
    },
    {
      name: 'pornhub',
      url: 'http://pornhub.com',
      group: Group.Leisure
    },
    {
      name: 'PKO BP',
      url: 'https://ipko.pl',
      group: Group.Banking
    },
    {
      name: 'ING',
      url: 'https://ing.pl',
      group: Group.Banking
    },
    {
      name: 'mBank',
      url: 'https://mbank.pl',
      group: Group.Banking
    },
    {
      name: 'CCN',
      url: 'https://ccn.com',
      group: Group.Crypto
    },
    {
      name: 'Bitcoin',
      url: 'http://bitcoin.org',
      group: Group.Crypto
    },
    {
      name: 'Litecoin',
      url: 'http://litecoin.org',
      group: Group.Crypto
    },
    {
      name: 'pracuj.pl',
      url: 'http://pracuj.pl',
      group: Group.Work
    },
    {
      name: 'Onwelo',
      url: 'http://onwelo.com',
      group: Group.Work
    }
  ]
};

const bookmarkReducer = createReducer(initialState,
  on(addBookmark, (state, { bookmark }) => (
    {
      ...state, bookmarks: [...state.bookmarks, bookmark]
    })
  )
);

export function reducer(state, action) {
  return bookmarkReducer(state, action);
}
