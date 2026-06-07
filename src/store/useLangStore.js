import { create } from 'zustand'
import i18n from '../i18n/index.js'

// Read-only mirror of i18next's active language. i18next is the SINGLE source of
// truth + persistence (localStorage 'ferma-lang'); this store never persists a
// competing key. Useful where a plain reactive selector is handier than the hook.

export const useLangStore = create((set) => ({
  language: i18n.resolvedLanguage || 'ru',
  // Switch via i18next -> emits 'languageChanged' -> mirror updates below.
  setLanguage: (lng) => {
    i18n.changeLanguage(lng)
  },
}))

i18n.on('languageChanged', (lng) => {
  useLangStore.setState({ language: lng })
})
