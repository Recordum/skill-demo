import { Injectable } from '@nestjs/common';
import { Bookmark } from '../../domain/bookmarks/entity/bookmark';
import { BookmarkRepository } from '../../domain/bookmarks/repository/bookmark.repository';

@Injectable()
export class InMemoryBookmarkRepository implements BookmarkRepository {
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
}
