import { ApplicationError } from './ApplicationError';

/**
 * ValidationError for request body, query params, or DTOs.
 */
export class ValidationError extends ApplicationError {
   constructor(message = 'Validation failed', details?: any) {
      super(message, 400, 'VALIDATION_ERROR', details);
   }
}
