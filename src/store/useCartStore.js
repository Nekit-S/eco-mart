import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getProduct, getPromoByCode } from '../data/index.js'
import { PROMO_TYPE, STORAGE_KEYS } from '../utils/constants.js'

// Cart + checkout draft. Items hold only { productId, qty, comment }; price is read
// live from products.json via selectors (single source of truth). The checkout draft
// (fulfillment/address/pickup/timeSlot/payment) is persisted too, so the wizard
// survives a refresh.

const emptyDraft = () => ({
  fulfillment: null, // 'delivery' | 'pickup'
  address: '',
  pickupPointId: null,
  timeSlot: null,
  payment: null, // 'cash' | 'card_on_delivery'
})

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      ...emptyDraft(),

      addItem: (productId, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.productId === productId)
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.productId === productId ? { ...i, qty: i.qty + qty } : i,
              ),
            }
          }
          return { items: [...s.items, { productId, qty, comment: '' }] }
        }),

      removeItem: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),

      setQty: (productId, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => i.productId !== productId)
              : s.items.map((i) => (i.productId === productId ? { ...i, qty } : i)),
        })),

      incQty: (productId) => get().setQty(productId, (getItemQty(get(), productId) || 0) + 1),
      decQty: (productId) => get().setQty(productId, (getItemQty(get(), productId) || 0) - 1),

      // Returns { ok, error?, promo? } for UI feedback. Sets promoCode only when valid.
      applyPromo: (code) => {
        const promo = getPromoByCode(code)
        if (!promo) return { ok: false, error: 'notFound' }
        if (promo.type === PROMO_TYPE.EXPIRED) return { ok: false, error: 'expired' }
        set({ promoCode: promo.code })
        return { ok: true, promo }
      },
      clearPromo: () => set({ promoCode: null }),

      setFulfillment: (type) => set({ fulfillment: type }),
      setAddress: (address) => set({ address }),
      setPickupPoint: (pickupPointId) => set({ pickupPointId }),
      setTimeSlot: (timeSlot) => set({ timeSlot }),
      setPayment: (payment) => set({ payment }),

      // Repeat order: prefill items from a past order's snapshot (scenario 4).
      replaceFromOrder: (order) =>
        set({
          items: (order?.items || []).map((it) => ({
            productId: it.productId,
            qty: it.qty,
            comment: '',
          })),
          promoCode: null,
          ...emptyDraft(),
        }),

      clear: () => set({ items: [], promoCode: null, ...emptyDraft() }),
    }),
    {
      name: STORAGE_KEYS.cart,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

// ---- Selectors (compose with useCartStore(selectX)) ----

function getItemQty(s, productId) {
  return s.items.find((i) => i.productId === productId)?.qty || 0
}

export const selectCount = (s) => s.items.reduce((n, i) => n + i.qty, 0)

export const selectSubtotal = (s) =>
  s.items.reduce((sum, i) => {
    const p = getProduct(i.productId)
    return sum + (p ? p.price * i.qty : 0)
  }, 0)

export function selectDiscount(s) {
  const promo = s.promoCode ? getPromoByCode(s.promoCode) : null
  if (!promo) return 0
  const sub = selectSubtotal(s)
  if (promo.type === PROMO_TYPE.PERCENT) return Math.round((sub * promo.value) / 100)
  if (promo.type === PROMO_TYPE.AMOUNT) {
    if (promo.categoryId) {
      const has = s.items.some((i) => getProduct(i.productId)?.categoryId === promo.categoryId)
      if (!has) return 0
    }
    return Math.min(promo.value, sub)
  }
  return 0
}

export const selectTotal = (s) => Math.max(0, selectSubtotal(s) - selectDiscount(s))

/** Snapshot items for order creation: embeds priceSnapshot + localized name + visuals
 *  so order history/repeat stay correct independent of products.json.
 *  Plain function (NOT a hook selector) — it returns a fresh array, so feeding it to
 *  useStore() directly would loop. Wrap in useMemo([items]) in components. */
export function buildSnapshotItems(items) {
  return items
    .map((i) => {
      const p = getProduct(i.productId)
      if (!p) return null
      return {
        productId: p.id,
        qty: i.qty,
        priceSnapshot: p.price,
        name: p.name,
        icon: p.icon,
        tone: p.tone,
        comment: i.comment || '',
      }
    })
    .filter(Boolean)
}
