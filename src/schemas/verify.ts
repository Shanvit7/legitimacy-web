import { fallback } from '@tanstack/zod-adapter';
import { z } from 'zod';

export const verifySchema = z.object({
  q: fallback(z.string().min(100, { message: 'Token is required' }), ''),
});
