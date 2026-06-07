import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { htmlLang } from './localeMap.js'
import ru from './locales/ru.json'
import kz from './locales/kz.json'
import en from './locales/en.json'

// Bundled resources (static imports) — no http-backend, no Suspense. Reliable for a
// demo: zero locale fetches at runtime, nothing to 404 on Vercel.

export const SUPPORTED_LANGS = ['ru', 'kz', 'en']

// Namespaces (top-level keys inside each locale JSON).
export const NAMESPACES = [
  'common',
  'nav',
  'home',
  'catalog',
  'product',
  'farmer',
  'cart',
  'checkout',
  'order',
  'profile',
  'auth',
  'onboarding',
  'support',
]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { ru, kz, en },
    fallbackLng: 'ru', // diploma is primarily Russian
    supportedLngs: SUPPORTED_LANGS,
    ns: NAMESPACES,
    defaultNS: 'common',
    returnNull: false,
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      // NOTE: do NOT set `lng` in init — it would override the detector and break
      // localStorage persistence.
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'ferma-lang',
    },
    react: {
      useSuspense: false,
    },
  })

// Keep <html lang> aligned with the active language (Kazakh -> 'kk').
function syncHtmlLang(lng) {
  document.documentElement.setAttribute('lang', htmlLang[lng] || lng || 'ru')
}
syncHtmlLang(i18n.resolvedLanguage)
i18n.on('languageChanged', syncHtmlLang)

export default i18n
