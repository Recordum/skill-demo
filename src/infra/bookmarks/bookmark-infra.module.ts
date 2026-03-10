import { Module } from '@nestjs/common';
import { BOOKMARK_REPOSITORY } from '../../domain/bookmarks/repository/bookmark.repository';
import { InMemoryBookmarkRepository } from './in-memory-bookmark.repository';

@Module({
  providers: [
    {
      provide: BOOKMARK_REPOSITORY,
      useClass: InMemoryBookmarkRepository,
    },
  ],
  exports: [BOOKMARK_REPOSITORY],
})
export class BookmarkInfraModule {}
