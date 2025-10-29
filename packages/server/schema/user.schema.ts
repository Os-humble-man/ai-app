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
   loginUser: {
      body: z.object({
         email: z.email('Invalid email'),
         password: z.string().min(6, 'Password too short'),
      }),
   },
};
