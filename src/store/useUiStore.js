import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// UI/preferences store. Persisted under 'ferma:ui' — the same key the anti-flash
// inline script in index.html reads (JSON.parse(raw).state.theme) to set data-theme
// before first paint.

const darkMq = () => window.matchMedia('(prefers-color-scheme: dark)')

/** Resolve a theme preference to a concrete 'light' | 'dark'. */
export function resolveTheme(theme) {
  if (theme === 'dark') return 'dark'
  if (theme === 'light') return 'light'
  return darkMq().matches ? 'dark' : 'light' // 'system'
}

/** Apply the resolved theme to <html data-theme> and return it. */
export function applyTheme(theme) {
  const resolved = resolveTheme(theme)
  document.documentElement.setAttribute('data-theme', resolved)
  return resolved
}

export const useUiStore = create(
  persist(
    (set, get) => ({
      theme: 'system', // 'system' | 'light' | 'dark'
      resolvedTheme: 'light',
      onboardingSeen: false,
      notifications: { orders: true, promos: false },

      setTheme: (theme) => {
        const resolvedTheme = applyTheme(theme)
        set({ theme, resolvedTheme })
      },

      toggleTheme: () => {
        const next = get().resolvedTheme === 'dark' ? 'light' : 'dark'
        get().setTheme(next)
      },

      /** Re-apply on OS scheme change — only meaningful while theme === 'system'. */
      syncSystem: () => {
        if (get().theme === 'system') {
          set({ resolvedTheme: applyTheme('system') })
        }
      },

      setOnboardingSeen: (v = true) => set({ onboardingSeen: v }),
      setNotification: (key, value) =>
        set((s) => ({ notifications: { ...s.notifications, [key]: value } })),
    }),
    {
      name: 'ferma:ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        theme: s.theme,
        onboardingSeen: s.onboardingSeen,
        notifications: s.notifications,
      }),
      onRehydrateStorage: () => (state) => {
        // Sync resolvedTheme to the persisted preference right after hydration.
        if (state) state.resolvedTheme = applyTheme(state.theme)
      },
    },
  ),
)
