import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { BusinessExceptionFilter } from '../src/common/exception/business-exception.filter';

describe('Bookmarks (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new BusinessExceptionFilter());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  const createBookmark = (title = 'Test Bookmark') =>
    request(app.getHttpServer())
      .post('/bookmarks')
      .send({ title, url: 'https://example.com', tags: ['test'] });

  // E2E 시나리오 1: 북마크 pin 성공
  it('POST → PATCH /:id/pin → isPinned=true', async () => {
    const { body: created } = await createBookmark();
    const { body: pinned } = await request(app.getHttpServer())
      .patch(`/bookmarks/${created.id}/pin`)
      .expect(200);

    expect(pinned.isPinned).toBe(true);
    expect(pinned.pinnedAt).not.toBeNull();
  });

  // E2E 시나리오 2: 북마크 unpin 성공
  it('pin → unpin 토글', async () => {
    const { body: created } = await createBookmark();
    await request(app.getHttpServer()).patch(`/bookmarks/${created.id}/pin`);
    const { body: unpinned } = await request(app.getHttpServer())
      .patch(`/bookmarks/${created.id}/pin`)
      .expect(200);

    expect(unpinned.isPinned).toBe(false);
    expect(unpinned.pinnedAt).toBeNull();
  });

  // E2E 시나리오 3: pin 10개 초과 시 에러
  it('11번째 pin 시도 시 400 에러', async () => {
    for (let i = 0; i < 10; i++) {
      const { body } = await createBookmark(`Bookmark ${i}`);
      await request(app.getHttpServer()).patch(`/bookmarks/${body.id}/pin`);
    }

    const { body: eleventh } = await createBookmark('Bookmark 11');
    const { body: error } = await request(app.getHttpServer())
      .patch(`/bookmarks/${eleventh.id}/pin`)
      .expect(400);

    expect(error.message).toContain('10개');
  });

  // E2E 시나리오 4: 목록 조회 시 pinned 우선
  it('GET /bookmarks → pinned가 첫 번째', async () => {
    await createBookmark('First');
    await createBookmark('Second');
    const { body: third } = await createBookmark('Third');
    await request(app.getHttpServer()).patch(`/bookmarks/${third.id}/pin`);

    const { body: list } = await request(app.getHttpServer())
      .get('/bookmarks')
      .expect(200);

    expect(list[0].title).toBe('Third');
    expect(list[0].isPinned).toBe(true);
  });

  // E2E 시나리오 5: 존재하지 않는 북마크 pin
  it('PATCH /bookmarks/999/pin → 404', async () => {
    await request(app.getHttpServer())
      .patch('/bookmarks/999/pin')
      .expect(404);
  });

  // E2E 시나리오 6: 기존 CRUD 정상 동작
  it('CRUD 정상 동작', async () => {
    const { body: created } = await createBookmark().expect(201);
    expect(created.title).toBe('Test Bookmark');

    await request(app.getHttpServer())
      .get(`/bookmarks/${created.id}`)
      .expect(200);

    const { body: updated } = await request(app.getHttpServer())
      .put(`/bookmarks/${created.id}`)
      .send({ title: 'Updated' })
      .expect(200);
    expect(updated.title).toBe('Updated');

    await request(app.getHttpServer())
      .delete(`/bookmarks/${created.id}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/bookmarks/${created.id}`)
      .expect(404);
  });
});
