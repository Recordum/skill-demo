import { Module } from '@nestjs/common';
import { BookmarkDomainModule } from '../../domain/bookmarks/bookmark-domain.module';
import { BookmarksController } from './controller/bookmarks.controller';
import { CreateBookmarkUsecase } from './usecase/create-bookmark.usecase';
import { GetBookmarksUsecase } from './usecase/get-bookmarks.usecase';
import { GetBookmarkUsecase } from './usecase/get-bookmark.usecase';
import { UpdateBookmarkUsecase } from './usecase/update-bookmark.usecase';
import { DeleteBookmarkUsecase } from './usecase/delete-bookmark.usecase';
import { TogglePinUsecase } from './usecase/toggle-pin.usecase';

@Module({
  imports: [BookmarkDomainModule],
  controllers: [BookmarksController],
  providers: [
    CreateBookmarkUsecase,
    GetBookmarksUsecase,
    GetBookmarkUsecase,
    UpdateBookmarkUsecase,
    DeleteBookmarkUsecase,
    TogglePinUsecase,
  ],
})
export class BookmarksApiModule {}
