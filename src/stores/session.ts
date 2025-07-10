import { create } from 'zustand';

// TYPES
import type { SessionState } from '@/types/crypto';

const useSessionStore = create<SessionState>((set) => ({
  key: null,
  shareId: null,
  setKey: (key) => set({ key }),
  setShareId: (shareId) => set({ shareId }),
  clearSession: () => set({ key: null, shareId: null }),
}));

export default useSessionStore;