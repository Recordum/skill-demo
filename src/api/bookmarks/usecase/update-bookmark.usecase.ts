import { Injectable } from '@nestjs/common';
import { BookmarkService } from '../../../domain/bookmarks/application/bookmark.service';
import { UpdateBookmarkReqDto } from '../dto/req/update-bookmark.req.dto';
import { Bookmark } from '../../../domain/bookmarks/entity/bookmark';

@Injectable()
export class UpdateBookmarkUsecase {
  constructor(private readonly bookmarkService: BookmarkService) {}

  execute(id: number, dto: UpdateBookmarkReqDto): Bookmark {
    return this.bookmarkService.update(id, dto);
  }
}
