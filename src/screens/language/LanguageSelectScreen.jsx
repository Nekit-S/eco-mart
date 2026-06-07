import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'

const LANGS = [
  { code: 'kz', label: 'Қазақша', sub: 'Қазақ тілі' },
  { code: 'ru', label: 'Русский', sub: 'Русский язык' },
  { code: 'en', label: 'English', sub: 'English' },
]

// Picking a language updates the UI live (preview); a Continue button advances —
// so changing language no longer instantly jumps to login.
export default function LanguageSelectScreen() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const current = i18n.resolvedLanguage

  return (
    <div className="lang-select">
      <div className="lang-select__head">
        <span className="lang-select__globe" aria-hidden="true">
          <Icon name="globe" size={40} strokeWidth={1.6} />
        </span>
        <h1 className="t-h1">Тіл · Язык · Language</h1>
      </div>

      <div className="lang-select__list">
        {LANGS.map((l) => {
          const active = current === l.code
          return (
            <button
              key={l.code}
              type="button"
              className={'lang-option card' + (active ? ' is-active' : '')}
              onClick={() => i18n.changeLanguage(l.code)}
              aria-pressed={active}
            >
              <span className="lang-option__text">
                <span className="lang-option__label">{l.label}</span>
                <span className="t-caption">{l.sub}</span>
              </span>
              <span className={'radio' + (active ? ' radio--on' : '')} aria-hidden="true">
                {active && <Icon name="check" size={14} strokeWidth={2.4} />}
              </span>
            </button>
          )
        })}
      </div>

      <div className="lang-select__foot">
        <Button fullWidth size="lg" onClick={() => navigate('/auth', { replace: true })}>
          {t('common:button.continue')}
        </Button>
      </div>
    </div>
  )
}
