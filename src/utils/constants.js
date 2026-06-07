// Domain enums shared across data, stores and screens.

export const CATEGORY = {
  COFFEE: 'coffee',
  FOOD: 'food',
  BAKERY: 'bakery',
  FARM: 'farm',
}

export const FULFILLMENT = {
  DELIVERY: 'delivery',
  PICKUP: 'pickup',
}

export const PAYMENT = {
  CASH: 'cash', // наличными при получении
  CARD_ON_DELIVERY: 'card_on_delivery', // картой при получении
  ONLINE: 'online', // post-MVP — disabled in the wizard
}

// Order lifecycle (diploma §3.2).
export const ORDER_STATUS = {
  CREATED: 'created',
  ACCEPTED: 'accepted',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERING: 'delivering',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

// Happy-path progression used by the mock status ticker (M7). Pickup orders skip
// 'delivering'.
export const STATUS_FLOW_DELIVERY = [
  ORDER_STATUS.CREATED,
  ORDER_STATUS.ACCEPTED,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.READY,
  ORDER_STATUS.DELIVERING,
  ORDER_STATUS.COMPLETED,
]
export const STATUS_FLOW_PICKUP = [
  ORDER_STATUS.CREATED,
  ORDER_STATUS.ACCEPTED,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.READY,
  ORDER_STATUS.COMPLETED,
]

export const PROMO_TYPE = {
  PERCENT: 'percent',
  AMOUNT: 'amount',
  EXPIRED: 'expired',
}

// localStorage keys (single source of truth for store names).
export const STORAGE_KEYS = {
  ui: 'ferma:ui',
  cart: 'ferma:cart',
  favorites: 'ferma:favorites',
  orders: 'ferma:orders',
  user: 'ferma:user',
  lang: 'ferma-lang', // owned by i18next detector
}
