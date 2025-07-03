// HOOKS
import { useMutation } from '@tanstack/react-query';
// SERVICES
import { verifyPdf } from '@/services/verify';
// TYPES
import type { Coords } from '@/types/location';
import type { VerifyRequest } from '@/types/verify';

const useVerifyAccess = () => {
    return useMutation({
        mutationFn: ({ token, coords }: VerifyRequest & { coords: Coords }) => verifyPdf({ token, coords }),
    });
};

export default useVerifyAccess;