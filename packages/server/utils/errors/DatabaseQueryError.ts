import { HttpStatus } from '../HttpStatus';
import { ApplicationError } from './ApplicationError';

/**
 * Specialized error for database query and ORM issues.
 * Compatible with Prisma, MySQL2, and PostgreSQL.
 * Handles known error codes and provides detailed context.
 *
 * @author Oscar Kanangila
 */
export class DatabaseQueryError extends ApplicationError {
   public readonly query?: string;
   public readonly parameters?: any[];
   public readonly originalError?: any;

   constructor(
      message: string,
      code = 'DB_ERROR',
      details?: any,
      query?: string,
      parameters?: any[],
      originalError?: any
   ) {
      super(message, HttpStatus.INTERNAL_SERVER_ERROR, code, details);
      this.query = query;
      this.parameters = parameters;
      this.originalError = originalError;
   }

   static from(
      error: any,
      query?: string,
      parameters?: any[]
   ): DatabaseQueryError {
      // Prisma known request error
      if (error?.code && error?.clientVersion) {
         return new DatabaseQueryError(
            `[Prisma] ${DatabaseQueryError.mapPrismaError(error.code)}: ${error.message}`,
            error.code,
            { target: error.meta?.target },
            query,
            parameters,
            error
         );
      }

      // MySQL or PG native error
      if (error?.sqlMessage || error?.message?.includes('SQL')) {
         return new DatabaseQueryError(
            `[SQL] ${error.sqlMessage || error.message}`,
            error.code || 'SQL_ERROR',
            { sql: error.sql },
            query,
            parameters,
            error
         );
      }

      // Generic fallback
      return new DatabaseQueryError(
         error?.message || 'Unknown database error',
         error?.code || 'UNKNOWN_DB_ERROR',
         undefined,
         query,
         parameters,
         error
      );
   }

   private static mapPrismaError(code: string): string {
      switch (code) {
         case 'P2002':
            return 'Unique constraint violation';
         case 'P2003':
            return 'Foreign key constraint failed';
         case 'P2025':
            return 'Record not found';
         default:
            return 'Database operation failed';
      }
   }
}
