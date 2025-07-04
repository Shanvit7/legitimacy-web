import { createFileRoute } from '@tanstack/react-router';
// PAGES
import SuccessfullyDownloaded from '@/pages/success';

export const Route = createFileRoute('/success')({
  component: SuccessfullyDownloaded,
})