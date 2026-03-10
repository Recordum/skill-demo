import { HttpStatus } from '@nestjs/common';

export interface ErrorCatalogEntry {
  domain: string;
  status: HttpStatus;
  apiMessage: string;
}

export const BUSINESS_ERROR_CATALOG = {
  BOOKMARK_NOT_FOUND: {
    domain: 'bookmark',
    status: HttpStatus.NOT_FOUND,
    apiMessage: '북마크를 찾을 수 없습니다',
  },
  PIN_LIMIT_EXCEEDED: {
    domain: 'bookmark',
    status: HttpStatus.BAD_REQUEST,
    apiMessage: '즐겨찾기는 최대 10개까지 설정할 수 있습니다',
  },
} as const satisfies Record<string, ErrorCatalogEntry>;

export type BusinessErrorCode = keyof typeof BUSINESS_ERROR_CATALOG;
