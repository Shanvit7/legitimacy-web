import { ApiService } from '@/services';
// CONSTANTS
import { VERIFY_API_URL } from '@/utils/constants';
// TYPES
import type { VerifyRequest } from '@/types/verify';

const verifyService = new ApiService(VERIFY_API_URL);

export const verifyPdf = async ({
    token,
}: VerifyRequest) => {
        const { data = {}, isError = false } = await verifyService.post('/access', { token }) ?? {};
        if (isError) {
            throw new Error('Failed to verify access');
        };
        return data;
};
