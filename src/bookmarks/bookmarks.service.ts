import { Injectable, NotFoundException } from '@nestjs/common';
import { Bookmark } from './bookmark.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Injectable()
export class BookmarksService {
  private bookmarks: Bookmark[] = [];
  private nextId = 1;

  findAll(tag?: string): Bookmark[] {
    if (tag) {
      return this.bookmarks.filter((b) => b.tags.includes(tag));
    }
    return this.bookmarks;
  }

  findOne(id: number): Bookmark {
    const bookmark = this.bookmarks.find((b) => b.id === id);
    if (!bookmark) {
      throw new NotFoundException(`Bookmark #${id} not found`);
    }
    return bookmark;
  }

  create(dto: CreateBookmarkDto): Bookmark {
    const bookmark = new Bookmark({
      id: this.nextId++,
      title: dto.title,
      url: dto.url,
      description: dto.description,
      tags: dto.tags ?? [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.bookmarks.push(bookmark);
    return bookmark;
  }

  update(id: number, dto: UpdateBookmarkDto): Bookmark {
    const bookmark = this.findOne(id);
    Object.assign(bookmark, { ...dto, updatedAt: new Date() });
    return bookmark;
  }

  remove(id: number): void {
    const index = this.bookmarks.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`Bookmark #${id} not found`);
    }
    this.bookmarks.splice(index, 1);
  }
}
