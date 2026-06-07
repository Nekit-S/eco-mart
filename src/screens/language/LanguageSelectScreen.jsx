import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const LANGS = [
  { code: 'kz', label: 'Қазақша', sub: 'Қазақ тілі' },
  { code: 'ru', label: 'Русский', sub: 'Русский язык' },
  { code: 'en', label: 'English', sub: 'English' },
]

export default function LanguageSelectScreen() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const current = i18n.resolvedLanguage

  const pick = (code) => {
    i18n.changeLanguage(code)
    navigate('/auth', { replace: true })
  }

  return (
    <div className="lang-select">
      <div className="lang-select__head">
        <span className="lang-select__globe" aria-hidden="true">🌍</span>
        <h1 className="t-h1">Тіл · Язык · Language</h1>
      </div>
      <div className="lang-select__list">
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            className={'lang-option card' + (current === l.code ? ' is-active' : '')}
            onClick={() => pick(l.code)}
          >
            <span className="lang-option__label">{l.label}</span>
            <span className="t-caption">{l.sub}</span>
            <span className="lang-option__check" aria-hidden="true">
              {current === l.code ? '●' : '○'}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
