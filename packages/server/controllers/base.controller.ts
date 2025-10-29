import type { NextFunction, Request, Response } from 'express';
import type {
   PaginatedResult,
   PaginationOptions,
   SearchOptions,
} from '../utils/pagination';
import { ApplicationError } from '../utils/errors/ApplicationError';
import { DatabaseQueryError } from '../utils/errors/DatabaseQueryError';
import { HttpStatus } from '../utils/HttpStatus';

/**
 * Standard API response
 */
export interface ApiResponse<T> {
   success: boolean;
   data?: T;
   message?: string;
   pagination?: any;
   error?: { code?: string; message?: string };
}

/**
 * Base controller for handling requests and responses
 * Supports pagination, search, and automatic error forwarding
 * @author Oscar Kanangila
 */
export abstract class BaseController {
   /**
    * Generic request handler
    */
   protected async handleRequest<T>(
      req: Request,
      res: Response,
      next: NextFunction,
      operation: () => Promise<T>
   ): Promise<void> {
      try {
         const result = await operation();
         // If the result is paginated, it will include pagination info
         if ((result as any)?.pagination) {
            this.sendPaginated(res, result as unknown as PaginatedResult<T>);
         } else {
            this.sendSuccess(res, result);
         }
      } catch (error: any) {
         const dbError =
            error instanceof ApplicationError
               ? error
               : DatabaseQueryError.from(error);
         next(dbError);
      }
   }

   /**
    * Send a standard success response
    */
   protected sendSuccess<T>(res: Response, data: T, message?: string): void {
      const response: ApiResponse<T> = {
         success: true,
         data,
         message,
      };
      res.status(HttpStatus.OK).json(response);
   }

   /**
    * Send a paginated response
    */
   protected sendPaginated<T>(
      res: Response,
      paginated: PaginatedResult<T>,
      message?: string
   ): void {
      const response: ApiResponse<T[]> = {
         success: true,
         data: paginated.data,
         message,
         pagination: paginated.pagination,
      };
      res.status(HttpStatus.OK).json(response);
   }

   /**
    * Extract pagination options from query params
    */
   protected getPaginationOptions(req: Request): PaginationOptions {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const sortBy = req.query.sortBy as string | undefined;
      const sortOrder = (req.query.sortOrder as 'ASC' | 'DESC') || 'ASC';

      return { page, limit, sortBy, sortOrder };
   }

   /**
    * Extract search options from query params
    */
   protected getSearchOptions(
      req: Request,
      searchFields: string[]
   ): SearchOptions {
      const search = req.query.search as string | undefined;
      return { search: search || '', searchFields };
   }
}
