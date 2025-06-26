export interface VerifyRequest {
  token: string;
}

export interface VerifyOtpRequest {
  otp: string;
  publicChallenge: string;
}

export interface VerifySessionRequest {
  shareId: string;
  publicChallenge: string;
}