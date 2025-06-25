import { create } from 'zustand';
// TYPES
import type { SessionState } from '@/types/crypto';

const useSessionStore = create<SessionState>((set) => ({
  key: null,
  setKey: (key) => set({ key }),
  clearKey: () => set({ key: null }),
}));

export default useSessionStore;
