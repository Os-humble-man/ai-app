import { injectable } from 'inversify';
import { DatabaseQueryError } from '../utils/errors/DatabaseQueryError';
import type {
   PaginatedResult,
   PaginationOptions,
   SearchOptions,
} from '../utils/pagination';
import { Prisma, PrismaClient } from '../generated/prisma/client';

/** Base repository class
 * Base repository using Prisma ORM.
 * Provides common CRUD, transaction, pagination and search functionalities.
 * @author Oscar Kanangila
 */
@injectable()
export class BaseRepository {
   protected prisma: PrismaClient;

   constructor(prismaClient?: PrismaClient) {
      this.prisma = prismaClient || new PrismaClient();
   }

   protected async withTransaction<T>(
      operation: (tx: Prisma.TransactionClient) => Promise<T>
   ): Promise<T> {
      try {
         return await this.prisma.$transaction(
            async (tx: Prisma.TransactionClient) => {
               return operation(tx);
            }
         );
      } catch (error: any) {
         throw DatabaseQueryError.from(error);
      }
   }

   protected applyPagination<T>(
      query: any,
      options: PaginationOptions
   ): { skip: number; take: number; orderBy?: any } {
      const skip = (options.page - 1) * options.limit;
      const take = options.limit;
      const orderBy = options.sortBy
         ? {
              [options.sortBy]:
                 options.sortOrder?.toLowerCase() === 'desc' ? 'desc' : 'asc',
           }
         : undefined;

      return { skip, take, orderBy };
   }

   protected applySearch(
      options: SearchOptions,
      fields: string[]
   ): Record<string, any> | undefined {
      if (!options.search || fields.length === 0) return undefined;

      return {
         OR: fields.map((field) => ({
            [field]: { contains: options.search, mode: 'insensitive' },
         })),
      };
   }

   /** Build paginated result */
   protected createPaginatedResult<T>(
      data: T[],
      totalItems: number,
      options: PaginationOptions
   ): PaginatedResult<T> {
      const totalPages = Math.ceil(totalItems / options.limit);

      return {
         data,
         pagination: {
            currentPage: options.page,
            totalPages,
            totalItems,
            itemsPerPage: options.limit,
            hasNext: options.page < totalPages,
            hasPrevious: options.page > 1,
         },
      };
   }
}
