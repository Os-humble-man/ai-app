import type { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../utils/errors/ApplicationError';

/**
 * Centralized error handler middleware for the entire application.
 * Handles both custom ApplicationError and unexpected errors.
 */
export function errorHandler(
   err: any,
   req: Request,
   res: Response,
   next: NextFunction
) {
   if (err instanceof ApplicationError) {
      return res.status(err.statusCode).json(err.toResponse());
   }

   console.error('🔥 Unexpected error:', err);

   return res.status(500).json({
      success: false,
      error: {
         code: 'INTERNAL_SERVER_ERROR',
         message: err?.message || 'Something went wrong',
      },
   });
}
