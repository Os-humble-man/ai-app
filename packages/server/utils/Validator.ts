import type { Request } from 'express';
import type { ZodSchema, ZodTypeAny } from 'zod';
import { ZodError } from 'zod';
import { ValidationError } from './errors/ValidationError';

export type ValidationSchemas = {
   body?: ZodSchema<any>;
   params?: ZodSchema<any>;
   query?: ZodSchema<any>;
   headers?: ZodSchema<any>;
   cookies?: ZodSchema<any>;
};

type ValidationHelpers<T extends ValidationSchemas> = {
   getBody(
      req: Request
   ): T['body'] extends ZodTypeAny ? ReturnType<T['body']['parse']> : any;
   getParams(
      req: Request
   ): T['params'] extends ZodTypeAny ? ReturnType<T['params']['parse']> : any;
   getQuery(
      req: Request
   ): T['query'] extends ZodTypeAny ? ReturnType<T['query']['parse']> : any;
   getCookies(
      req: Request
   ): T['cookies'] extends ZodTypeAny ? ReturnType<T['cookies']['parse']> : any;
   getHeaders(
      req: Request
   ): T['headers'] extends ZodTypeAny ? ReturnType<T['headers']['parse']> : any;
};

const makeValidator = <T extends ValidationSchemas>(
   schemas: T
): ValidationHelpers<T> => {
   const createValidator = (key: keyof ValidationSchemas) => (req: Request) => {
      const schema = schemas[key];
      const value = req[key] as any;

      if (!schema) return value;

      try {
         return schema.parse(value);
      } catch (err) {
         if (err instanceof ZodError) {
            throw new ValidationError('Validation failed', err.format());
         }
         throw err;
      }
   };

   return {
      getBody: createValidator('body'),
      getParams: createValidator('params'),
      getQuery: createValidator('query'),
      getHeaders: createValidator('headers'),
      getCookies: createValidator('cookies'),
   } as ValidationHelpers<T>;
};

export { makeValidator };
