/**
 * Custom error class for database query issues.
 * Wraps low-level ORM or SQL errors into a unified format
 * for consistent error handling across repositories.
 *
 * @author Oscar Kanangila
 */
export class DatabaseQueryError extends Error {
   public readonly code?: string;
   public readonly query?: string;
   public readonly parameters?: any[];
   public readonly originalError?: any;

   constructor(
      message: string,
      code?: string,
      query?: string,
      parameters?: any[],
      originalError?: any
   ) {
      super(message);
      this.name = 'DatabaseQueryError';
      this.code = code;
      this.query = query;
      this.parameters = parameters;
      this.originalError = originalError;

      // Fix prototype chain for instanceof to work correctly
      Object.setPrototypeOf(this, new.target.prototype);
   }

   /**
    * Factory method to create a DatabaseQueryError from any caught error.
    * Supports Prisma, MySQL, PostgreSQL, and generic JS errors.
    */
   static from(
      error: any,
      query?: string,
      parameters?: any[]
   ): DatabaseQueryError {
      // Prisma known request error (ex: P2002 unique constraint)
      if (error?.code && error?.clientVersion) {
         return new DatabaseQueryError(
            `[Prisma] ${DatabaseQueryError.mapPrismaError(error.code)}: ${error.message}`,
            error.code,
            query,
            parameters,
            error
         );
      }

      // MySQL or PostgreSQL native error
      if (error?.sqlMessage || error?.message?.includes('SQL')) {
         return new DatabaseQueryError(
            `[SQL] ${error.sqlMessage || error.message}`,
            error.code || 'SQL_ERROR',
            query,
            parameters,
            error
         );
      }

      // Generic fallback
      return new DatabaseQueryError(
         error?.message || 'Unknown database error',
         error?.code,
         query,
         parameters,
         error
      );
   }

   /**
    * Translate common Prisma error codes into readable messages.
    */
   private static mapPrismaError(code: string): string {
      switch (code) {
         case 'P2002':
            return 'Unique constraint violation (duplicate value)';
         case 'P2003':
            return 'Foreign key constraint failed';
         case 'P2025':
            return 'Record not found';
         default:
            return 'Database operation failed';
      }
   }

   /**
    * Custom JSON representation for logging or API responses.
    */
   toJSON() {
      return {
         name: this.name,
         message: this.message,
         code: this.code,
         query: this.query,
         parameters: this.parameters,
      };
   }
}
