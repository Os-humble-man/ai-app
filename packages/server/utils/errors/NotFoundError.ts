import { ApplicationError } from './ApplicationError';

export class NotFoundError extends ApplicationError {
   constructor(resource: string, id?: any) {
      super(`${resource} not found`, 404, 'NOT_FOUND', { resource, id });
   }
}
