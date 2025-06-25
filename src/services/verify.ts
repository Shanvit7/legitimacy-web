// CORE
import { ApiService } from '@/services';
// CONSTANTS
import { VERIFY_API_URL } from '@/utils/constants';
// SCHEMAS
import type { OtpFormSchema } from '@/schemas/otp';
// TYPES
import type { VerifyRequest } from '@/types/verify';

const verifyService = new ApiService(VERIFY_API_URL);

export const verifyPdf = async ({ token }: VerifyRequest) => {
  const { data = {}, isError = false } = (await verifyService.post('/access', { token })) ?? {};
  if (isError) {
    throw new Error('Failed to verify access');
  };
  return data;
};

export const verifyOtp = async ({ otp }: OtpFormSchema) => {
  const { data = {}, isError = false } = (await verifyService.post('/otp', { otp })) ?? {};
  if (isError) {
    throw new Error('Failed to verify OTP');
  };
  return data;
};