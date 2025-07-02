// HOOKS
import { useMutation } from '@tanstack/react-query';
// SERVICES
import { verifyOtp } from '@/services/verify';
// SCHEMAS
import type { VerifyOtpRequest } from '@/types/verify';
// HOOKS
import { useMemo } from 'react';
// STORES
import useGeolocationStore from '@/stores/geolocation';
// COMPONENTS
import { toast } from 'sonner';
// TYPES
import type { Coords } from '@/types/location';

const useVerifyOtp = () => {
    const { isSuccess = false, isLoading = true, latitude, longitude, altitude } = useGeolocationStore() ?? {};
    const coords = useMemo(() => ({ latitude, longitude, altitude }) as Coords, [latitude, longitude, altitude]);
    return useMutation({
        mutationFn: ({ otp, publicChallenge }: VerifyOtpRequest) => {
            if(isLoading) {
                toast.warning('We are still getting your location, please wait a moment and try again.');
                return Promise.reject(new Error('Geolocation is loading...'));
            };
            if(isSuccess) {
                return verifyOtp({ otp, publicChallenge, coords });
            };
            toast.error('Geolocation is not available. Please allow location access to continue or make sure you have stable internet connection.');
            return Promise.reject(new Error('Geolocation is not available'));
        },
    });
};

export default useVerifyOtp;