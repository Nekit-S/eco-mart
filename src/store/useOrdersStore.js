import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getSeedOrders } from '../data/index.js'
import {
  ORDER_STATUS,
  STATUS_FLOW_DELIVERY,
  STATUS_FLOW_PICKUP,
  FULFILLMENT,
  STORAGE_KEYS,
} from '../utils/constants.js'

const flowFor = (order) =>
  order?.fulfillment?.type === FULFILLMENT.PICKUP ? STATUS_FLOW_PICKUP : STATUS_FLOW_DELIVERY

export const useOrdersStore = create(
  persist(
    (set, get) => ({
      orders: [],

      // Seed a fresh install so "repeat order" works with zero setup (scenario 4).
      seedIfEmpty: () =>
        set((s) => (s.orders.length === 0 ? { orders: getSeedOrders() } : s)),

      // Create from a checkout draft. `input.items` are snapshot items
      // (selectSnapshotItems). Returns the new order (with id) for navigation.
      createOrder: (input) => {
        const order = {
          id: `ord-${Date.now().toString().slice(-7)}`,
          createdAt: new Date().toISOString(),
          status: ORDER_STATUS.CREATED,
          items: input.items || [],
          total: input.total ?? 0,
          subtotal: input.subtotal ?? input.total ?? 0,
          discount: input.discount ?? 0,
          promoCode: input.promoCode ?? null,
          fulfillment: input.fulfillment || { type: FULFILLMENT.DELIVERY },
          payment: input.payment || null,
        }
        set((s) => ({ orders: [order, ...s.orders] }))
        return order
      },

      getById: (id) => get().orders.find((o) => o.id === id) || null,

      setStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),

      // Move one step along the happy path (used by the mock status ticker, M7).
      advanceStatus: (id) =>
        set((s) => ({
          orders: s.orders.map((o) => {
            if (o.id !== id || o.status === ORDER_STATUS.CANCELLED) return o
            const flow = flowFor(o)
            const idx = flow.indexOf(o.status)
            if (idx < 0 || idx >= flow.length - 1) return o
            return { ...o, status: flow[idx + 1] }
          }),
        })),

      cancel: (id) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === id ? { ...o, status: ORDER_STATUS.CANCELLED } : o,
          ),
        })),

      clear: () => set({ orders: [] }),
    }),
    {
      name: STORAGE_KEYS.orders,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const selectLastOrder = (s) => s.orders[0] || null
