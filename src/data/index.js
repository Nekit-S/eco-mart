// Mock data access layer. JSON files store translatable fields as { ru, kz, en }
// objects; `localizeEntity` flattens them to the active language at read time.
// Domain content lives HERE (not in i18next, which holds UI strings only).

import categories from './categories.json'
import products from './products.json'
import farmers from './farmers.json'
import promos from './promos.json'
import pickupPoints from './pickupPoints.json'
import ordersSeed from './orders.seed.json'

const FALLBACK = 'ru'

const isLocalized = (v) =>
  v && typeof v === 'object' && !Array.isArray(v) && ('ru' in v || 'kz' in v || 'en' in v)

/** Deep-flatten any { ru, kz, en } fields of an entity to `lng`. Safe on nested
 *  objects/arrays; leaves plain values (e.g. size {value,unit}) untouched. */
export function localizeEntity(entity, lng = FALLBACK) {
  if (entity == null || typeof entity !== 'object') return entity
  if (Array.isArray(entity)) return entity.map((e) => localizeEntity(e, lng))
  const out = {}
  for (const [key, value] of Object.entries(entity)) {
    if (isLocalized(value)) out[key] = value[lng] ?? value[FALLBACK]
    else if (value && typeof value === 'object') out[key] = localizeEntity(value, lng)
    else out[key] = value
  }
  return out
}

export const localizeList = (list, lng) => list.map((e) => localizeEntity(e, lng))

// ---- Categories ----
export const getCategories = () => categories

// ---- Products ----
export const getProducts = () => products
export const getProduct = (id) => products.find((p) => p.id === id) || null
export const getProductsByFarmer = (farmerId) =>
  products.filter((p) => p.farmerId === farmerId)
export const getPopularProducts = () =>
  products.filter((p) => Array.isArray(p.tags) && p.tags.includes('popular'))
export const getRelatedProducts = (product, limit = 4) =>
  products
    .filter((p) => p.id !== product.id && p.farmerId === product.farmerId)
    .concat(products.filter((p) => p.id !== product.id && p.categoryId === product.categoryId))
    .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
    .slice(0, limit)

// ---- Farmers ----
export const getFarmers = () => farmers
export const getFarmer = (id) => farmers.find((f) => f.id === id) || null
export const getFarmerOfWeek = () =>
  farmers.find((f) => f.farmerOfWeek) || farmers[0] || null

// ---- Promos ----
export const getPromoByCode = (code) =>
  promos.find((p) => p.code.toUpperCase() === String(code || '').trim().toUpperCase()) || null

// ---- Pickup points ----
export const getPickupPoints = () => pickupPoints
export const getPickupPoint = (id) => pickupPoints.find((p) => p.id === id) || null

// ---- Seed orders (consumed by useOrdersStore.seedIfEmpty in M4) ----
export const getSeedOrders = () => ordersSeed
