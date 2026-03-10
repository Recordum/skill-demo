import { Injectable } from '@nestjs/common';
import { BookmarkService } from '../../../domain/bookmarks/application/bookmark.service';
import { CreateBookmarkReqDto } from '../dto/req/create-bookmark.req.dto';
import { Bookmark } from '../../../domain/bookmarks/entity/bookmark';

@Injectable()
export class CreateBookmarkUsecase {
  constructor(private readonly bookmarkService: BookmarkService) {}

  execute(dto: CreateBookmarkReqDto): Bookmark {
    return this.bookmarkService.create(dto);
  }
}
