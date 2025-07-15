import { createFileRoute } from '@tanstack/react-router';
// PAGES
import SharePage from '@/pages/share';

export const Route = createFileRoute('/share')({
  component: SharePage,
  ssr: false,
})