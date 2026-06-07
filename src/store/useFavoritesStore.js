import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { STORAGE_KEYS } from '../utils/constants.js'

// Favorites — a set of product ids. One-tap toggle (diploma scenario 6).
export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      ids: [],
      isFavorite: (id) => get().ids.includes(id),
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id],
        })),
      clear: () => set({ ids: [] }),
    }),
    {
      name: STORAGE_KEYS.favorites,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const selectFavCount = (s) => s.ids.length
