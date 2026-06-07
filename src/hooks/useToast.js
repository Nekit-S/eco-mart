import { create } from 'zustand'

// Tiny toast store (not persisted). show() returns the id; ToastHost renders + auto-dismisses.
let seq = 0

export const useToastStore = create((set) => ({
  toasts: [],
  show: (message, { tone = 'neutral', duration = 2200 } = {}) => {
    const id = ++seq
    set((s) => ({ toasts: [...s.toasts, { id, message, tone, duration }] }))
    return id
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

// Convenience hook used by components: const toast = useToast()
export function useToast() {
  return useToastStore((s) => s.show)
}
