// CORE
import { ApiService } from '@/services';
// CONSTANTS
import { VERIFY_API_URL } from '@/utils/constants';
// TYPES
import type { VerifyRequest, VerifyOtpRequest, VerifySessionRequest } from '@/types/verify';

const verifyService = new ApiService(VERIFY_API_URL);

export const verifyPdf = async ({ token }: VerifyRequest) => {
  const { data = {}, isError = false } = (await verifyService.post('/access', { token })) ?? {};
  if (isError) {
    throw new Error('Failed to verify access');
  };
  return data;
};

export const verifyOtp = async ({ otp }: VerifyOtpRequest) => {
  const { data = {}, isError = false } = (await verifyService.post('/otp', { otp })) ?? {};
  if (isError) {
    throw new Error('Failed to verify OTP');
  };
  return data;
};

export const verifySession = async ({ shareId, publicChallenge }: VerifySessionRequest) => {
  const response = (await verifyService.post('/session', { shareId, publicChallenge })) ?? {};
  if (response.isError) {
    throw new Error('Failed to verify session');
  };
  return response;
};