import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookmarksApiModule } from './api/bookmarks/bookmarks-api.module';

@Module({
  imports: [BookmarksApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
