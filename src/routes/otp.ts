// PAGES
import OtpPage from '@/pages/otp';
// STORES
import useSessionStore from '@/stores/session';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/otp')({
  beforeLoad: async () => {
    const key = useSessionStore.getState().key !== null;
    if (!key) throw redirect({ to: '/404' });
  },
  component: OtpPage,
});
