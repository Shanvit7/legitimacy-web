import { createFileRoute } from '@tanstack/react-router';
// PAGES
import InvalidSessionPage from '@/pages/invalid-session';

export const Route = createFileRoute('/invalid')({
  component: InvalidSessionPage,
})