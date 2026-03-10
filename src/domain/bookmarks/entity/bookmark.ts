import { throwBusinessException } from '../../../common/exception/business-exception.util';

const MAX_PIN_LIMIT = 10;

interface CreateBookmarkParams {
  id: number;
  title: string;
  url: string;
  description: string | null;
  tags: string[];
}

interface UpdateBookmarkParams {
  title?: string;
  url?: string;
  description?: string | null;
  tags?: string[];
}

export class Bookmark {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly url: string,
    readonly description: string | null,
    readonly tags: string[],
    readonly isPinned: boolean,
    readonly pinnedAt: Date | null,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}

  static create(params: CreateBookmarkParams): Bookmark {
    const now = new Date();
    return new Bookmark(
      params.id,
      params.title,
      params.url,
      params.description,
      params.tags,
      false,
      null,
      now,
      now,
    );
  }

  get canPin(): boolean {
    return !this.isPinned;
  }

  pin(currentPinCount: number): Bookmark {
    if (this.isPinned) {
      throwBusinessException({
        code: 'PIN_LIMIT_EXCEEDED',
        logMessage: `Bookmark #${this.id} is already pinned`,
      });
    }

    if (currentPinCount >= MAX_PIN_LIMIT) {
      throwBusinessException({
        code: 'PIN_LIMIT_EXCEEDED',
        logMessage: `Pin limit exceeded: current=${currentPinCount}, max=${MAX_PIN_LIMIT}`,
      });
    }

    return new Bookmark(
      this.id,
      this.title,
      this.url,
      this.description,
      this.tags,
      true,
      new Date(),
      this.createdAt,
      this.updatedAt,
    );
  }

  unpin(): Bookmark {
    return new Bookmark(
      this.id,
      this.title,
      this.url,
      this.description,
      this.tags,
      false,
      null,
      this.createdAt,
      this.updatedAt,
    );
  }

  update(params: UpdateBookmarkParams): Bookmark {
    return new Bookmark(
      this.id,
      params.title ?? this.title,
      params.url ?? this.url,
      params.description !== undefined ? params.description : this.description,
      params.tags ?? this.tags,
      this.isPinned,
      this.pinnedAt,
      this.createdAt,
      new Date(),
    );
  }
}
