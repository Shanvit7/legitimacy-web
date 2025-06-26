// PAGES
import OtpPage from '@/pages/otp';
// STORES
import useSessionStore from '@/stores/session';
import { createFileRoute, redirect } from '@tanstack/react-router';
// UTILS
import { sha256 } from '@/utils/crypto';
// SERVICES
import { verifySession } from '@/services/verify';

export const Route = createFileRoute('/otp')({
  beforeLoad: async () => {
    const { key, shareId, setShareId } = useSessionStore.getState() ?? {};
    if (!key || !shareId) throw redirect({ to: '/404' });
    const publicChallenge = await sha256(key.toString());
    const { isError = true, isSuccess = false }= (await verifySession({ shareId, publicChallenge })) ?? {};
    if (isError) throw redirect({ to: '/404' });
    if (isSuccess) {
      setShareId('');
    }
  },
  component: OtpPage,
});
