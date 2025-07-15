// CORE
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
// PAGES
import VerifyPage from '@/pages/verify';
// SCHEMAS
import { verifySchema } from '@/schemas/verify';

export const Route = createFileRoute('/verify')({
  component: VerifyPage,
  validateSearch: zodValidator(verifySchema),
  ssr: false,
});
