import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CreateBookmarkReqDto } from '../dto/req/create-bookmark.req.dto';
import { UpdateBookmarkReqDto } from '../dto/req/update-bookmark.req.dto';
import { BookmarkResDto } from '../dto/res/bookmark.res.dto';
import { CreateBookmarkUsecase } from '../usecase/create-bookmark.usecase';
import { GetBookmarksUsecase } from '../usecase/get-bookmarks.usecase';
import { GetBookmarkUsecase } from '../usecase/get-bookmark.usecase';
import { UpdateBookmarkUsecase } from '../usecase/update-bookmark.usecase';
import { DeleteBookmarkUsecase } from '../usecase/delete-bookmark.usecase';
import { TogglePinUsecase } from '../usecase/toggle-pin.usecase';

@Controller('bookmarks')
export class BookmarksController {
  constructor(
    private readonly createBookmark: CreateBookmarkUsecase,
    private readonly getBookmarks: GetBookmarksUsecase,
    private readonly getBookmark: GetBookmarkUsecase,
    private readonly updateBookmark: UpdateBookmarkUsecase,
    private readonly deleteBookmark: DeleteBookmarkUsecase,
    private readonly togglePin: TogglePinUsecase,
  ) {}

  @Get()
  findAll(@Query('tag') tag?: string): BookmarkResDto[] {
    return BookmarkResDto.fromList(this.getBookmarks.execute(tag));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): BookmarkResDto {
    return BookmarkResDto.from(this.getBookmark.execute(id));
  }

  @Post()
  create(@Body() dto: CreateBookmarkReqDto): BookmarkResDto {
    return BookmarkResDto.from(this.createBookmark.execute(dto));
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookmarkReqDto,
  ): BookmarkResDto {
    return BookmarkResDto.from(this.updateBookmark.execute(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.deleteBookmark.execute(id);
  }

  @Patch(':id/pin')
  pin(@Param('id', ParseIntPipe) id: number): BookmarkResDto {
    return BookmarkResDto.from(this.togglePin.execute(id));
  }
}
