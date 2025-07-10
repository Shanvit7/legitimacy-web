// CORE
import { ApiService } from '@/services';
// CONSTANTS
import { VERIFY_API_URL } from '@/utils/constants';
// TYPES
import type { VerifyRequest, VerifyOtpRequest, VerifySessionRequest } from '@/types/verify';
import type { Coords } from '@/types/location';
// UTILS
import { VerifyError } from '@/utils/error';

const verifyService = new ApiService(VERIFY_API_URL);

export const verifyPdf = async ({ token, coords }: VerifyRequest & { coords: Coords }) => {
  const { data = {}, isError = false, statusCode = 500 } = (await verifyService.post('/access', { token, coords })) ?? {};
  if (isError) {
    throw new VerifyError('Failed to verify access', statusCode ?? 500);
  };
  return data;
};

export const verifyOtp = async ({ otp, publicChallenge, coords }: VerifyOtpRequest & { coords: Coords }) => {
  const { isError = false, data = {}, statusCode = 500 } = (await verifyService.post('/otp', { otp, publicChallenge, coords }, { responseType: 'blob' })) ?? {};
  if (isError) {
    throw new VerifyError('Failed to verify OTP', statusCode ?? 500);
  };
  return data;
};

export const verifySession = async ({ shareId, publicChallenge, coords }: VerifySessionRequest) => {
  const response = (await verifyService.post('/session', { shareId, publicChallenge, coords })) ?? {};
  if (response?.isError) {
    throw new VerifyError('Failed to verify session', response?.statusCode ?? 500);
  };
  return response;
};