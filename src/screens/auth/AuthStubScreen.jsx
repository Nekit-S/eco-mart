import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button.jsx'
import { useUserStore } from '../../store/useUserStore.js'

// Auth STUB — any input proceeds; guest option too. No real backend.
export default function AuthStubScreen() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const login = useUserStore((s) => s.login)
  const continueAsGuest = useUserStore((s) => s.continueAsGuest)
  const [value, setValue] = useState('')

  const proceed = () => {
    login({ phone: value })
    navigate('/home', { replace: true })
  }
  const guest = () => {
    continueAsGuest()
    navigate('/home', { replace: true })
  }

  return (
    <div className="auth">
      <div className="auth__head">
        <span className="auth__logo" aria-hidden="true">☕</span>
        <h1 className="t-h1">{t('auth:title')}</h1>
        <p className="t-caption">{t('auth:subtitle')}</p>
      </div>

      <form
        className="auth__form"
        onSubmit={(e) => {
          e.preventDefault()
          proceed()
        }}
      >
        <input
          className="input"
          type="tel"
          inputMode="tel"
          placeholder={t('auth:phone')}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label={t('auth:phone')}
        />
        <Button type="submit" fullWidth size="lg">
          {t('auth:continue')}
        </Button>
        <Button type="button" variant="ghost" fullWidth onClick={guest}>
          {t('auth:guest')}
        </Button>
      </form>

      <p className="t-caption auth__consent">{t('auth:consent')}</p>
    </div>
  )
}
