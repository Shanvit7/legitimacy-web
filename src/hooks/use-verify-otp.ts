// HOOKS
import { useMutation } from '@tanstack/react-query';
// SERVICES
import { verifyOtp } from '@/services/verify';
// SCHEMAS
import type { VerifyOtpRequest } from '@/types/verify';

const useVerifyOtp = () => {
    return useMutation({
        mutationFn: ({ otp, publicChallenge }: VerifyOtpRequest) => verifyOtp({ otp, publicChallenge }),
    });
};

export default useVerifyOtp;