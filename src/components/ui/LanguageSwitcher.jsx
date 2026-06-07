import { useTranslation } from 'react-i18next'

const LANGS = [
  { code: 'kz', label: 'Қазақша' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
]

// Switches language at runtime via i18next — re-renders in place, NO reload
// (diploma scenario 7). `compact` renders short codes (KZ/RU/EN) for the header.
export default function LanguageSwitcher({ compact = false }) {
  const { i18n } = useTranslation()
  const current = i18n.resolvedLanguage

  return (
    <div className="lang-switch" role="group" aria-label="Язык интерфейса">
      {LANGS.map((l) => {
        const active = current === l.code
        return (
          <button
            key={l.code}
            type="button"
            className={'lang-chip' + (active ? ' is-active' : '')}
            aria-pressed={active}
            onClick={() => i18n.changeLanguage(l.code)}
          >
            {compact ? l.code.toUpperCase() : l.label}
          </button>
        )
      })}
    </div>
  )
}
