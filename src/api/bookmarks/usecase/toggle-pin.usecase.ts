import { Injectable } from '@nestjs/common';
import { BookmarkService } from '../../../domain/bookmarks/application/bookmark.service';
import { Bookmark } from '../../../domain/bookmarks/entity/bookmark';

@Injectable()
export class TogglePinUsecase {
  constructor(private readonly bookmarkService: BookmarkService) {}

  execute(id: number): Bookmark {
    return this.bookmarkService.togglePin(id);
  }
}
