export interface SessionState {
  key: CryptoKey | null;  // ESK
  shareId: string | null;
  setKey: (key: CryptoKey) => void;
  setShareId: (shareId: string) => void;
  clearSession: () => void;
}
