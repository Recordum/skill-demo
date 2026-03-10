import { Injectable } from '@nestjs/common';
import { BookmarkService } from '../../../domain/bookmarks/application/bookmark.service';

@Injectable()
export class DeleteBookmarkUsecase {
  constructor(private readonly bookmarkService: BookmarkService) {}

  execute(id: number): void {
    this.bookmarkService.remove(id);
  }
}
