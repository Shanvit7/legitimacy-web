// COMPONENTS
import InvalidQR from '@/components/molecules/invalid-qr';
import Spinner from '@/components/atoms/spinner';
import LocationNotGot from '@/components/molecules/location-not-got';
import { toast } from 'sonner';
// HOOKS
import useVerifyAccess from '@/hooks/use-verify-access';
import { useEffect, useMemo } from 'react';
import { useRouter } from '@tanstack/react-router';
// STORES
import useGeolocationStore from '@/stores/geolocation';
// STORES
import useSessionStore from '@/stores/session';
// UTILS
import { generateSessionKey } from '@/utils/crypto';
// TYPES
import type { Coords } from '@/types/location';

const VerificationStatus = ({ token }: { token: string }) => {
  const { isLoading = true, isSuccess = false, latitude, longitude, altitude } = useGeolocationStore() ?? {};
  const coords = useMemo(() => ({ latitude, longitude, altitude }) as Coords, [latitude, longitude, altitude]);
    const router = useRouter();
    const { setKey, setShareId } = useSessionStore() ?? {};
    const { 
      mutate: verifyAccess, 
      isPending = true, 
      isError = false,
      isIdle = true,
    } = useVerifyAccess() ?? {};

    useEffect(() => {
      if(isLoading) {
        toast.warning('We are trying to get your location, please ensure you have allowed location access and have stable internet connection.');
      };
      if(isSuccess) {
        verifyAccess({ token, coords },{
          onSuccess: async (data) => {
            const { shareId } = data as { shareId: string };
            setShareId(shareId);
            const key = await generateSessionKey() ?? null;
            setKey(key);
            router.navigate({ to: '/otp' });
            },
          });
      }
    }, [token, verifyAccess, router, setKey, setShareId, coords, isSuccess, isLoading]);

    if(!isSuccess && !isLoading) {
      return <LocationNotGot />;
    };

    if(isPending || isIdle || isLoading) {
        return (
          <div className="relative z-10 flex h-screen items-center justify-center">
          <div className="bg-slate-800/70 border border-slate-700/50 backdrop-blur-sm rounded-lg p-8 max-w-sm w-full text-center">
            <Spinner />
            <h2 className="pt-4 text-2xl font-bold text-white">Verifying…</h2>
            <p className="pt-2 text-slate-400">Please wait, this may take a few seconds.</p>
          </div>
        </div>
        );
    };
    if (!token || isError) return <InvalidQR />;
};

export default VerificationStatus;