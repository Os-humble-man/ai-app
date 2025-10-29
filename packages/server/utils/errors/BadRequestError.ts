import { HttpStatus } from '../HttpStatus';
import { ApplicationError } from './ApplicationError';

/**
 * Bad request error (400).
 */
export class BadRequestError extends ApplicationError {
   constructor(message = 'Bad request', status = HttpStatus.BAD_REQUEST) {
      super(message, status, 'BAD_REQUEST');
   }
}
