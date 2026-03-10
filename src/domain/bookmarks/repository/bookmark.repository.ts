import { Bookmark } from '../entity/bookmark';

export const BOOKMARK_REPOSITORY = Symbol('BOOKMARK_REPOSITORY');

export interface BookmarkRepository {
  findAll(): Bookmark[];
  findById(id: number): Bookmark | null;
  save(bookmark: Bookmark): Bookmark;
  remove(id: number): void;
  countPinned(): number;
  nextId(): number;
}
