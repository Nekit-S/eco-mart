import { useTranslation } from 'react-i18next'

// Active language code ('ru' | 'kz' | 'en'), re-rendering on change.
export function useLang() {
  const { i18n } = useTranslation()
  return i18n.resolvedLanguage || 'ru'
}
