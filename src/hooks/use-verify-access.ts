// HOOKS
import { useMutation } from '@tanstack/react-query';
// SERVICES
import { verifyPdf } from '@/services/verify';
// TYPES
import type { Coords } from '@/types/location';
import type { VerifyRequest } from '@/types/verify';
// COMPONENTS
import { toast } from 'sonner';
// HOOKS
import { useMemo } from 'react';
// STORES
import useGeolocationStore from '@/stores/geolocation';

const useVerifyAccess = () => {
    const { isSuccess = false, isLoading = true, latitude, longitude, altitude } = useGeolocationStore() ?? {};
    const coords = useMemo(() => ({ latitude, longitude, altitude }) as Coords, [latitude, longitude, altitude]);
    return useMutation({
        mutationFn: ({ token }: VerifyRequest) => {
            if(isLoading) {
                toast.warning('We are still getting your location, please wait a moment and try again.');
                return Promise.reject(new Error('Geolocation is loading...'));
            };
            if(isSuccess) {
                return verifyPdf({ token, coords });
            };
            toast.error('Geolocation is not available. Please allow location access to continue or make sure you have stable internet connection.');
            return Promise.reject(new Error('Geolocation is not available'));
        },
    });
};

export default useVerifyAccess;