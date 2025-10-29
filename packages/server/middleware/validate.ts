import type { Request, Response, NextFunction } from 'express';
import { makeValidator, type ValidationSchemas } from '../utils/Validator';

/**
 * Middleware to validate request data using Zod schemas.
 * @param schemas - An object containing Zod schemas for different parts of the request.
 * @returns An Express middleware function.
 * @example
 * ```typescript
 * import { registerUserSchema } from '../schema/UserSchema';
 *
 * app.post('/users', validate(registerUserSchema), userController.createUser);
 * ```
 * @throws {ValidationError} If validation fails, a ValidationError is thrown.
 * @author Oscar Kanangila
 */
export const validate = (schemas: ValidationSchemas) => {
   return (req: Request, res: Response, next: NextFunction) => {
      try {
         const validator = makeValidator(schemas);

         if (schemas.body) {
            req.body = validator.getBody(req);
         }

         if (schemas.params) {
            req.params = validator.getParams(req);
         }

         if (schemas.query) {
            req.query = validator.getQuery(req);
         }

         if (schemas.headers) {
            // For headers, we can just validate without modifying
            validator.getHeaders(req);
         }

         if (schemas.cookies) {
            req.cookies = validator.getCookies(req);
         }

         next();
      } catch (err) {
         next(err); // Pass the error to error middleware
      }
   };
};
