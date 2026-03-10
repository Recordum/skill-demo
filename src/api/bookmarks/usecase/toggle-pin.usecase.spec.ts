import { BookmarkService } from '../../../domain/bookmarks/application/bookmark.service';
import { Bookmark } from '../../../domain/bookmarks/entity/bookmark';
import { BusinessException } from '../../../common/exception/business.exception';
import { TogglePinUsecase } from './toggle-pin.usecase';
import { FakeBookmarkRepository } from '../../../../test/fixture/fake-bookmark.repository';

describe('TogglePinUsecase', () => {
  let usecase: TogglePinUsecase;
  let repository: FakeBookmarkRepository;

  const createBookmark = (id: number, isPinned = false) => {
    const bookmark = Bookmark.create({
      id,
      title: `Bookmark ${id}`,
      url: `https://example.com/${id}`,
      description: null,
      tags: [],
    });
    return isPinned ? bookmark.pin(0) : bookmark;
  };

  beforeEach(() => {
    repository = new FakeBookmarkRepository();
    const service = new BookmarkService(repository);
    usecase = new TogglePinUsecase(service);
  });

  it('존재하는 북마크를 pin한다', () => {
    repository.givenBookmarks(createBookmark(1));

    const result = usecase.execute(1);

    expect(result.isPinned).toBe(true);
    expect(result.pinnedAt).toBeInstanceOf(Date);
    expect(repository.findById(1)!.isPinned).toBe(true);
  });

  it('pinned 북마크를 unpin한다', () => {
    repository.givenBookmarks(createBookmark(1, true));

    const result = usecase.execute(1);

    expect(result.isPinned).toBe(false);
    expect(result.pinnedAt).toBeNull();
    expect(repository.findById(1)!.isPinned).toBe(false);
  });

  it('존재하지 않는 북마크 pin 시도 시 BOOKMARK_NOT_FOUND 에러', () => {
    expect(() => usecase.execute(999)).toThrow(BusinessException);
  });

  it('pin 10개 상태에서 11번째 pin 시도 시 PIN_LIMIT_EXCEEDED 에러', () => {
    const pinned = Array.from({ length: 10 }, (_, i) =>
      createBookmark(i + 1, true),
    );
    const unpinned = createBookmark(11);
    repository.givenBookmarks(...pinned, unpinned);

    expect(() => usecase.execute(11)).toThrow(BusinessException);
    expect(repository.findById(11)!.isPinned).toBe(false);
  });
});
