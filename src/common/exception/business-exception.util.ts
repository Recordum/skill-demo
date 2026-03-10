import {
  BUSINESS_ERROR_CATALOG,
  BusinessErrorCode,
} from './business-error-catalog';
import { BusinessException } from './business.exception';

export function throwBusinessException(params: {
  code: BusinessErrorCode;
  logMessage: string;
  context?: Record<string, unknown>;
}): never {
  const entry = BUSINESS_ERROR_CATALOG[params.code];
  throw new BusinessException(
    entry.domain,
    entry.apiMessage,
    params.logMessage,
    entry.status,
    params.context,
  );
}
