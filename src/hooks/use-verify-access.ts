// HOOKS
import { useMutation } from '@tanstack/react-query';
// SERVICES
import { verifyPdf } from '@/services/verify';
// TYPES
import type { VerifyRequest } from '@/types/verify';

const useVerifyAccess = () => {
    return useMutation({
        mutationFn: ({ token }: VerifyRequest) => verifyPdf({ token }),
    });
};

export default useVerifyAccess;