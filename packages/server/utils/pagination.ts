export interface PaginationOptions {
   page: number;
   limit: number;
   sortBy?: string;
   sortOrder?: 'ASC' | 'DESC';
}

export interface SearchOptions {
   search?: string;
   searchFields?: string[];
}

export interface PaginatedResult<T> {
   data: T[];
   pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNext: boolean;
      hasPrevious: boolean;
   };
}

export interface QueryFilters extends PaginationOptions, SearchOptions {
   // Specific filters can be added here
}
