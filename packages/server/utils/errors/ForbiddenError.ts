import { HttpStatus } from '../HttpStatus';
import { ApplicationError } from './ApplicationError';

/**
 * Authentication / authorization error (403 ).
 */
export class ForbiddenError extends ApplicationError {
   constructor(message = 'Forbidden access', status = HttpStatus.FORBIDDEN) {
      super(message, status, 'FORBIDDEN');
   }
}
