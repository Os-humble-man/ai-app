import { HttpStatus } from '../HttpStatus';
import { ApplicationError } from './ApplicationError';

/**
 * Authentication / authorization error (401 ).
 */
export class UnauthorizedError extends ApplicationError {
   constructor(
      message = 'Unauthorized access',
      status = HttpStatus.UNAUTHORIZED
   ) {
      super(message, status, 'UNAUTHORIZED');
   }
}
