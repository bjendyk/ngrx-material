import { GroupService } from './group.service';

const storeStub = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
const selectSpy = jasmine.createSpy('select');
storeStub.pipe.and.callFake(selectSpy);

describe('GroupService', () => {
  let svc;

  beforeEach(() => {
    svc = new GroupService(storeStub);
  });

  it('getGroups() should select the data from the store', () => {
    svc.getGroups();
    expect(storeStub.pipe).toHaveBeenCalled();
    expect(selectSpy).toHaveBeenCalled();
  });

  it('createGroup() should dispatch the store message', () => {
    const groupName = 'group';
    svc.createGroup(groupName);
    expect(storeStub.dispatch).toHaveBeenCalledWith({
      groupName, type: '[Group] add group'
    });
  });

  it('deleteGroup() should dispatch the store message', () => {
    const groupName = 'group';
    svc.deleteGroup(groupName);
    expect(storeStub.dispatch).toHaveBeenCalledWith({
      groupName, type: '[Group] delete group'
    });
  });
});
