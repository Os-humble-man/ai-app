import { HttpStatus } from '../HttpStatus';

/**
 * Base class for all custom application errors.
 * Provides a unified structure for error handling and API responses.
 *
 * @author Oscar Kanangila
 */
export class ApplicationError extends Error {
   public readonly statusCode: number;
   public readonly code: string;
   public readonly details?: any;

   constructor(
      message: string,
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
      code = 'INTERNAL_ERROR',
      details?: any
   ) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode;
      this.code = code;
      this.details = details;

      Object.setPrototypeOf(this, new.target.prototype);
   }

   /**
    * Converts the error into a serializable object (for JSON API response)
    */
   toJSON() {
      return {
         name: this.name,
         message: this.message,
         code: this.code,
         statusCode: this.statusCode,
         details: this.details,
      };
   }

   /**
    * Creates a standard HTTP response body for this error
    */
   toResponse() {
      return {
         success: false,
         error: {
            code: this.code,
            message: this.message,
            ...(this.details && { details: this.details }),
         },
      };
   }
}
