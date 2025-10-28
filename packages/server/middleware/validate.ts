import type { NextFunction, Response, Request } from 'express';
import type { ZodTypeAny } from 'zod';
import { ValidationError } from '../utils/errors/ValidationError';

export const validate =
   (schema: ZodTypeAny) =>
   (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req.body);
      if (!result.success) {
         return next(
            new ValidationError('Validation échouée', result.error.flatten())
         );
      }
      req.body = result.data;
      next();
   };
