// HOOKS
import { useMutation } from '@tanstack/react-query';
// SERVICES
import { verifyOtp } from '@/services/verify';
// SCHEMAS
import type { OtpFormSchema } from '@/schemas/otp';

const useVerifyOtp = () => {
    return useMutation({
        mutationFn: ({ otp }: OtpFormSchema) => verifyOtp({ otp }),
    });
};

export default useVerifyOtp;