import { ApplicationError } from './ApplicationError';

/**
 * Authentication / authorization error (401 / 403).
 */
export class UnauthorizedError extends ApplicationError {
   constructor(message = 'Unauthorized access', status = 401) {
      super(message, status, 'UNAUTHORIZED');
   }
}
