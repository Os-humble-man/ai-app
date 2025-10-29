import { HttpStatus } from '../HttpStatus';
import { ApplicationError } from './ApplicationError';

/**
 * ValidationError for request body, query params, or DTOs.
 */
export class ValidationError extends ApplicationError {
   constructor(message = 'Validation failed', details?: any) {
      super(message, HttpStatus.BAD_REQUEST, 'VALIDATION_ERROR', details);
   }
}
