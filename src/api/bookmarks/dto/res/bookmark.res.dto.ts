import { Bookmark } from '../../../../domain/bookmarks/entity/bookmark';

export class BookmarkResDto {
  readonly id: number;
  readonly title: string;
  readonly url: string;
  readonly description: string | null;
  readonly tags: string[];
  readonly isPinned: boolean;
  readonly pinnedAt: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(bookmark: Bookmark) {
    this.id = bookmark.id;
    this.title = bookmark.title;
    this.url = bookmark.url;
    this.description = bookmark.description;
    this.tags = bookmark.tags;
    this.isPinned = bookmark.isPinned;
    this.pinnedAt = bookmark.pinnedAt;
    this.createdAt = bookmark.createdAt;
    this.updatedAt = bookmark.updatedAt;
  }

  static from(bookmark: Bookmark): BookmarkResDto {
    return new BookmarkResDto(bookmark);
  }

  static fromList(bookmarks: Bookmark[]): BookmarkResDto[] {
    return bookmarks.map((b) => BookmarkResDto.from(b));
  }
}
