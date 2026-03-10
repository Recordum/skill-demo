import { Injectable } from '@nestjs/common';
import { BookmarkService } from '../../../domain/bookmarks/application/bookmark.service';
import { Bookmark } from '../../../domain/bookmarks/entity/bookmark';

@Injectable()
export class GetBookmarkUsecase {
  constructor(private readonly bookmarkService: BookmarkService) {}

  execute(id: number): Bookmark {
    return this.bookmarkService.findOne(id);
  }
}
