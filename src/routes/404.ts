import { createFileRoute } from '@tanstack/react-router';
// PAGES
import NotFoundPage from '@/pages/not-found';

export const Route = createFileRoute('/404')({
  component: NotFoundPage,
});
