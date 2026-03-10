import { Bookmark } from '../../src/domain/bookmarks/entity/bookmark';
import { BookmarkRepository } from '../../src/domain/bookmarks/repository/bookmark.repository';

export class FakeBookmarkRepository implements BookmarkRepository {
  private bookmarks: Map<number, Bookmark> = new Map();
  private idCounter = 0;

  findAll(): Bookmark[] {
    return Array.from(this.bookmarks.values());
  }

  findById(id: number): Bookmark | null {
    return this.bookmarks.get(id) ?? null;
  }

  save(bookmark: Bookmark): Bookmark {
    this.bookmarks.set(bookmark.id, bookmark);
    return bookmark;
  }

  remove(id: number): void {
    this.bookmarks.delete(id);
  }

  countPinned(): number {
    return Array.from(this.bookmarks.values()).filter((b) => b.isPinned).length;
  }

  nextId(): number {
    return ++this.idCounter;
  }

  givenBookmarks(...bookmarks: Bookmark[]): void {
    this.bookmarks.clear();
    for (const b of bookmarks) {
      this.bookmarks.set(b.id, b);
    }
  }
}
