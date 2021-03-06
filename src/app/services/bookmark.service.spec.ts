import { BookmarkService } from './bookmark.service';
import { Bookmark } from '../model/bookmark.entity';

const storeStub = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
const selectSpy = jasmine.createSpy('select');
storeStub.pipe.and.callFake(selectSpy);

describe('BookmarkService', () => {
  let svc;

  beforeEach(() => {
    svc = new BookmarkService(storeStub);
  });

  it('createBookmark() should dispatch the store message', () => {
    const bookmark: Bookmark = { name: 'bookmark', url: 'url', group: 'Personal' } as Bookmark;
    svc.createBookmark(bookmark.name, bookmark.url, bookmark.group);
    expect(storeStub.dispatch).toHaveBeenCalledWith({
      bookmark, type: '[Bookmark] add bookmark'
    });
  });

  it('deleteBookmark() should dispatch the store message', () => {
    const name = 'bookmark';
    svc.deleteBookmark(name);
    expect(storeStub.dispatch).toHaveBeenCalledWith({
      name, type: '[Bookmark] delete bookmark'
    });
  });

  it('getBookmarks() should select the data from the store', () => {
    svc.getBookmarks('group');
    expect(storeStub.pipe).toHaveBeenCalled();
    expect(selectSpy).toHaveBeenCalled();
  });
});
