import { BookmarkService } from '../../../domain/bookmarks/application/bookmark.service';
import { Bookmark } from '../../../domain/bookmarks/entity/bookmark';
import { GetBookmarksUsecase } from './get-bookmarks.usecase';
import { FakeBookmarkRepository } from '../../../../test/fixture/fake-bookmark.repository';

describe('GetBookmarksUsecase', () => {
  let usecase: GetBookmarksUsecase;
  let repository: FakeBookmarkRepository;

  beforeEach(() => {
    repository = new FakeBookmarkRepository();
    const service = new BookmarkService(repository);
    usecase = new GetBookmarksUsecase(service);
  });

  it('findAll 시 pinned 북마크가 상단 정렬된다', () => {
    const unpinned1 = Bookmark.create({
      id: 1,
      title: 'First',
      url: 'https://example.com/1',
      description: null,
      tags: [],
    });
    const unpinned2 = Bookmark.create({
      id: 2,
      title: 'Second',
      url: 'https://example.com/2',
      description: null,
      tags: [],
    });
    const pinned = Bookmark.create({
      id: 3,
      title: 'Pinned',
      url: 'https://example.com/3',
      description: null,
      tags: [],
    }).pin(0);

    repository.givenBookmarks(unpinned1, unpinned2, pinned);

    const result = usecase.execute();

    expect(result[0].id).toBe(3);
    expect(result[0].isPinned).toBe(true);
    expect(result[1].id).toBe(1);
    expect(result[2].id).toBe(2);
  });
});
