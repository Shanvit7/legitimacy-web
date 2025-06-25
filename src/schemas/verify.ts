import { z } from 'zod';
import { fallback } from '@tanstack/zod-adapter';

export const verifySchema = z.object({
    q: fallback(z.string().min(100, { message: 'Token is required' }), ''),
});
  