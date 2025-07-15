// PAGES
import OtpPage from '@/pages/otp';
// STORES
import useSessionStore from '@/stores/session';
// STORES
import useGeolocationStore from '@/stores/geolocation';
import { createFileRoute, redirect } from '@tanstack/react-router';
// UTILS
import { sha256 } from '@/utils/crypto';
// SERVICES
import { verifySession } from '@/services/verify';
// TYPES
import type { Coords } from '@/types/location';
// LOGGER
import logger from '@/utils/logger';

export const Route = createFileRoute('/otp')({
  beforeLoad: async () => {
    const { key, shareId, setShareId } = useSessionStore.getState() ?? {};
    const { latitude, longitude, altitude } = useGeolocationStore.getState() ?? {};
    const coords = { latitude, longitude, altitude } as Coords;
    if (!key || !shareId) throw redirect({ to: '/invalid' });
    const publicChallenge = await sha256(key.toString());
    try {
      const { isError = true, isSuccess = false }= (await verifySession({ shareId, publicChallenge, coords })) ?? {};
      if (isError) throw redirect({ to: '/invalid' });
      if (isSuccess) {
        setShareId('');
      }
    } catch (error) {
      logger.error(error);
      throw redirect({ to: '/invalid' });
    }
  },
  component: OtpPage,
  ssr: false,
});