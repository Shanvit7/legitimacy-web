// CORE
import { ApiService } from '@/services';
// CONSTANTS
import { VERIFY_API_URL } from '@/utils/constants';
// TYPES
import type { VerifyRequest, VerifyOtpRequest, VerifySessionRequest } from '@/types/verify';
import type { Coords } from '@/types/location';

const verifyService = new ApiService(VERIFY_API_URL);

export const verifyPdf = async ({ token, coords }: VerifyRequest & { coords: Coords }) => {
  const { data = {}, isError = false } = (await verifyService.post('/access', { token, coords })) ?? {};
  if (isError) {
    throw new Error('Failed to verify access');
  };
  return data;
};

export const verifyOtp = async ({ otp, publicChallenge, coords }: VerifyOtpRequest & { coords: Coords }) => {
  const { isError = false, data = {} } = (await verifyService.post('/otp', { otp, publicChallenge, coords }, { responseType: 'blob' })) ?? {};
  if (isError) {
    throw new Error('Failed to verify OTP');
  };
  return data;
};

export const verifySession = async ({ shareId, publicChallenge, coords }: VerifySessionRequest) => {
  const response = (await verifyService.post('/session', { shareId, publicChallenge, coords })) ?? {};
  if (response.isError) {
    throw new Error('Failed to verify session');
  };
  return response;
};