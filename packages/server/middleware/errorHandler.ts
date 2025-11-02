import type { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../utils/errors/ApplicationError';
import { errorConverters } from '../utils/errors/ErrorConverters';

/**
 * Centralized error handler middleware for the entire application.
 * Handles both custom ApplicationError and unexpected errors.
 * @param err - The error object thrown in the application.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param _next - The next middleware function (not used here).
 * @author Oscar Kanangila
 */
export function errorHandler(
   err: any,
   req: Request,
   res: Response,
   _next: NextFunction
) {
   // If headers are already sent, don't try to send another response
   if (res.headersSent) {
      return;
   }

   //  Find a converter that matches the error
   for (const converter of errorConverters) {
      if (converter.test(err)) {
         const { status, body } = converter.converter(err);
         return res.status(status).json(body);
      }
   }

   // If no converter matches, handle the error by default
   if (err instanceof ApplicationError) {
      return res.status(err.statusCode).json(err.toResponse());
   }

   console.error('Unexpected error:', err);

   return res.status(500).json({
      success: false,
      error: {
         code: 'INTERNAL_SERVER_ERROR',
         message: err?.message || 'Something went wrong',
      },
   });
}
