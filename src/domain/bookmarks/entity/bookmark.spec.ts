import { Bookmark } from './bookmark';
import { BusinessException } from '../../../common/exception/business.exception';

describe('Bookmark Entity', () => {
  const createUnpinnedBookmark = () =>
    Bookmark.create({
      id: 1,
      title: 'Test',
      url: 'https://example.com',
      description: null,
      tags: [],
    });

  const createPinnedBookmark = () => {
    const bookmark = createUnpinnedBookmark();
    return bookmark.pin(0);
  };

  it('생성 시 isPinned 기본값은 false', () => {
    const bookmark = createUnpinnedBookmark();

    expect(bookmark.isPinned).toBe(false);
    expect(bookmark.pinnedAt).toBeNull();
  });

  it('pin 되지 않은 북마크를 pin한다', () => {
    const original = createUnpinnedBookmark();

    const pinned = original.pin(0);

    expect(pinned).not.toBe(original);
    expect(pinned.isPinned).toBe(true);
    expect(pinned.pinnedAt).toBeInstanceOf(Date);
  });

  it('pin된 북마크를 unpin한다', () => {
    const pinned = createPinnedBookmark();

    const unpinned = pinned.unpin();

    expect(unpinned).not.toBe(pinned);
    expect(unpinned.isPinned).toBe(false);
    expect(unpinned.pinnedAt).toBeNull();
  });

  it('canPin은 isPinned가 false일 때 true를 반환', () => {
    const bookmark = createUnpinnedBookmark();
    expect(bookmark.canPin).toBe(true);
  });

  it('canPin은 isPinned가 true일 때 false를 반환', () => {
    const pinned = createPinnedBookmark();
    expect(pinned.canPin).toBe(false);
  });

  it('pin 시 currentPinCount가 10 이상이면 에러', () => {
    const bookmark = createUnpinnedBookmark();

    expect(() => bookmark.pin(10)).toThrow(BusinessException);
  });

  it('이미 pinned인 북마크를 pin하면 에러', () => {
    const pinned = createPinnedBookmark();

    expect(() => pinned.pin(1)).toThrow(BusinessException);
  });

  it('update 시 새 인스턴스를 반환한다', () => {
    const original = createUnpinnedBookmark();

    const updated = original.update({ title: 'New Title' });

    expect(updated).not.toBe(original);
    expect(updated.title).toBe('New Title');
    expect(original.title).toBe('Test');
  });
});
