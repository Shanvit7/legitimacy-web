import { createFileRoute, redirect } from '@tanstack/react-router';
// PAGES
import OtpPage from '@/pages/otp';
// STORES
import useSessionStore from '@/stores/session';


export const Route = createFileRoute('/otp')({
  beforeLoad: async () => {
    const key = useSessionStore.getState().key !== null;
    if (!key) throw redirect({ to: '/404' });
  },
  component: OtpPage,
});