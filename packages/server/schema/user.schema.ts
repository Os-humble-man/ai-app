import { z } from 'zod';

export const UserSchema = {
   registerUser: {
      body: z.object({
         name: z
            .string()
            .min(2, 'The name must contain at least 2 characters.'),
         email: z.email('Invalid email'),
         password: z.string().min(6, 'Password too short'),
      }),
   },
   updatePassword: {
      body: z.object({
         password: z.string().min(6, 'Password too short'),
      }),
      params: z.object({
         id: z.uuid('Invalid user ID'),
      }),
   },
   userIdParam: {
      params: z.object({
         id: z.string('Invalid user ID'),
      }),
   },
   userEmailParam: {
      params: z.object({
         email: z.email('Invalid email'),
      }),
   },
   loginUser: {
      body: z.object({
         email: z.email('Invalid email'),
         password: z.string().min(6, 'Password too short'),
      }),
   },
};
