import { useTranslation } from 'react-i18next'
import { localeMap } from '../i18n/localeMap.js'

// Tenge has no minor unit in everyday pricing -> 0 fraction digits.
export function formatTenge(amount, lng = 'ru') {
  return new Intl.NumberFormat(localeMap[lng] || 'ru-RU', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount)
}

// Hook bound to the active language. Returns a (amount) => string formatter.
export function useMoney() {
  const { i18n } = useTranslation()
  const lng = i18n.resolvedLanguage || 'ru'
  return (amount) => formatTenge(amount, lng)
}
