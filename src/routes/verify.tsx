// CORE
import { createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
// SCHEMAS
import { verifySchema } from '@/schemas/verify';
// PAGES
import VerifyPage from '@/pages/verify';


export const Route = createFileRoute('/verify')({
  component: VerifyPage,
  validateSearch: zodValidator(verifySchema),
});
