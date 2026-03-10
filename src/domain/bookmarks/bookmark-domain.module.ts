import { Module } from '@nestjs/common';
import { BookmarkService } from './application/bookmark.service';
import { BookmarkInfraModule } from '../../infra/bookmarks/bookmark-infra.module';

@Module({
  imports: [BookmarkInfraModule],
  providers: [BookmarkService],
  exports: [BookmarkService],
})
export class BookmarkDomainModule {}
