// HOOKS
import { useMutation } from '@tanstack/react-query';
// SERVICES
import { verifyOtp } from '@/services/verify';
// SCHEMAS
import type { VerifyOtpRequest } from '@/types/verify';
// TYPES
import type { Coords } from '@/types/location';

const useVerifyOtp = () => {
    return useMutation({
        mutationFn: ({ otp, publicChallenge, coords }: VerifyOtpRequest & { coords: Coords }) => verifyOtp({ otp, publicChallenge, coords }),
    });
};

export default useVerifyOtp;