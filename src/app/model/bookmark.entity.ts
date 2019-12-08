import { Group } from './group.enum';

export interface Bookmark {
  name: string;
  url: string;
  group: Group;
}
