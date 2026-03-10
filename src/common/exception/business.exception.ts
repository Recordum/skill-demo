import { HttpStatus } from '@nestjs/common';

export class BusinessException extends Error {
  constructor(
    readonly domain: string,
    readonly apiMessage: string,
    readonly logMessage: string,
    readonly status: HttpStatus,
    readonly context?: Record<string, unknown>,
  ) {
    super(apiMessage);
    this.name = 'BusinessException';
  }
}
