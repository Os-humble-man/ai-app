import { ApplicationError } from './ApplicationError';
import { BadRequestError } from './BadRequestError';
import { BusinessError } from './BusinessError';
import { DatabaseQueryError } from './DatabaseQueryError';
import { ForbiddenError } from './ForbiddenError';
import { NotFoundError } from './NotFoundError';
import { UnauthorizedError } from './UnauthorizedError';
import { ValidationError } from './ValidationError';

type ErrorConverter<E = any> = {
   test: (err: E | any) => err is E;
   converter: (err: E) => {
      status: number;
      body: string | Record<string, any>;
   };
};

type ErrorConverterFn = <E = any>(
   test: (err: E | any) => err is E,
   converter: (err: E) => { status: number; body: string | Record<string, any> }
) => ErrorConverter<E>;

const errorConverter: ErrorConverterFn = (test, converter) => ({
   test,
   converter,
});

const errorConverters = [
   errorConverter<ApplicationError>(
      (err): err is ApplicationError => err instanceof ApplicationError,
      (err) => ({
         status: err.statusCode,
         body: err.toResponse(),
      })
   ),
   errorConverter<NotFoundError>(
      (err): err is NotFoundError => err instanceof NotFoundError,
      (err) => ({
         status: err.statusCode,
         body: err.toResponse(),
      })
   ),
   errorConverter<ValidationError>(
      (err): err is ValidationError => err instanceof ValidationError,
      (err) => ({
         status: err.statusCode,
         body: err.toResponse(),
      })
   ),
   errorConverter<DatabaseQueryError>(
      (err): err is DatabaseQueryError => err instanceof DatabaseQueryError,
      (err) => ({
         status: err.statusCode,
         body: err.toResponse(),
      })
   ),
   errorConverter<UnauthorizedError>(
      (err): err is UnauthorizedError => err instanceof UnauthorizedError,
      (err) => ({
         status: err.statusCode,
         body: err.toResponse(),
      })
   ),
   errorConverter<BadRequestError>(
      (err): err is BadRequestError => err instanceof BadRequestError,
      (err) => ({
         status: err.statusCode,
         body: err.toResponse(),
      })
   ),
   errorConverter<BusinessError>(
      (err): err is BusinessError => err instanceof BusinessError,
      (err) => ({
         status: err.statusCode,
         body: err.toResponse(),
      })
   ),
   errorConverter<ForbiddenError>(
      (err): err is ForbiddenError => err instanceof ForbiddenError,
      (err) => ({
         status: err.statusCode,
         body: err.toResponse(),
      })
   ),
];

export { errorConverters };
