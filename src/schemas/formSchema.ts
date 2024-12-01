import { z } from 'zod';

export const formSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(3, { message: 'Username is invalid' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(4, { message: 'Invalid password' }),
});
