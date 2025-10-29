import { HttpStatus } from '../HttpStatus';
import { ApplicationError } from './ApplicationError';

/**
 * Business logic error (4xx).
 */
export class BusinessError extends ApplicationError {
   constructor(message = 'Business logic error', status = HttpStatus.CONFLICT) {
      super(message, status, 'BUSINESS_ERROR');
   }
}
