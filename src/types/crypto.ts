export interface SessionState {
  key: CryptoKey | null;
  setKey: (key: CryptoKey) => void;
  clearKey: () => void;
}
