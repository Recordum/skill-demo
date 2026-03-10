import { Inject, Injectable } from '@nestjs/common';
import { Bookmark } from '../entity/bookmark';
import {
  BOOKMARK_REPOSITORY,
  BookmarkRepository,
} from '../repository/bookmark.repository';
import { throwBusinessException } from '../../../common/exception/business-exception.util';

@Injectable()
export class BookmarkService {
  constructor(
    @Inject(BOOKMARK_REPOSITORY)
    private readonly repository: BookmarkRepository,
  ) {}

  create(params: {
    title: string;
    url: string;
    description?: string;
    tags?: string[];
  }): Bookmark {
    const bookmark = Bookmark.create({
      id: this.repository.nextId(),
      title: params.title,
      url: params.url,
      description: params.description ?? null,
      tags: params.tags ?? [],
    });
    return this.repository.save(bookmark);
  }

  findAll(tag?: string): Bookmark[] {
    let bookmarks = this.repository.findAll();

    if (tag) {
      bookmarks = bookmarks.filter((b) => b.tags.includes(tag));
    }

    return bookmarks.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      if (a.isPinned && b.isPinned) {
        return (b.pinnedAt?.getTime() ?? 0) - (a.pinnedAt?.getTime() ?? 0);
      }
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
  }

  findOne(id: number): Bookmark {
    const bookmark = this.repository.findById(id);
    if (!bookmark) {
      throwBusinessException({
        code: 'BOOKMARK_NOT_FOUND',
        logMessage: `Bookmark #${id} not found`,
      });
    }
    return bookmark;
  }

  update(
    id: number,
    params: {
      title?: string;
      url?: string;
      description?: string;
      tags?: string[];
    },
  ): Bookmark {
    const bookmark = this.findOne(id);
    const updated = bookmark.update(params);
    return this.repository.save(updated);
  }

  remove(id: number): void {
    this.findOne(id);
    this.repository.remove(id);
  }

  togglePin(id: number): Bookmark {
    const bookmark = this.findOne(id);

    if (bookmark.isPinned) {
      const unpinned = bookmark.unpin();
      return this.repository.save(unpinned);
    }

    const currentPinCount = this.repository.countPinned();
    const pinned = bookmark.pin(currentPinCount);
    return this.repository.save(pinned);
  }
}
