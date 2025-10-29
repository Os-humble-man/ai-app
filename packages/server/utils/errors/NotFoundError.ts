import { HttpStatus } from '../HttpStatus';
import { ApplicationError } from './ApplicationError';

export class NotFoundError extends ApplicationError {
   constructor(resource: string, id?: any) {
      super(`${resource} not found`, HttpStatus.NOT_FOUND, 'NOT_FOUND', {
         resource,
         id,
      });
   }
}
