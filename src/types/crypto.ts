export interface SessionState {
  key: string | null;  // ESK
  shareId: string | null;
  setKey: (key: string) => void;
  setShareId: (shareId: string) => void;
  clearSession: () => void;
}
