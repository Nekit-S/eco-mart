import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { STORAGE_KEYS } from '../utils/constants.js'

// Auth STUB — no real backend. Any phone/email "logs in"; guest mode is allowed.
export const useUserStore = create(
  persist(
    (set) => ({
      isAuthed: false,
      isGuest: false,
      name: '',
      phone: '',

      login: ({ name = '', phone = '' } = {}) =>
        set({ isAuthed: true, isGuest: false, name, phone }),
      continueAsGuest: () => set({ isAuthed: true, isGuest: true, name: '', phone: '' }),
      setPhone: (phone) => set({ phone }),
      logout: () => set({ isAuthed: false, isGuest: false, name: '', phone: '' }),
    }),
    {
      name: STORAGE_KEYS.user,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
