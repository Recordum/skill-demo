import { Injectable } from '@nestjs/common';
import { BookmarkService } from '../../../domain/bookmarks/application/bookmark.service';
import { Bookmark } from '../../../domain/bookmarks/entity/bookmark';

@Injectable()
export class GetBookmarksUsecase {
  constructor(private readonly bookmarkService: BookmarkService) {}

  execute(tag?: string): Bookmark[] {
    return this.bookmarkService.findAll(tag);
  }
}
