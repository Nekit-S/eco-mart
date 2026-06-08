import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from '../../components/layout/AppHeader.jsx'
import Page from '../../components/layout/Page.jsx'
import Section from '../../components/layout/Section.jsx'
import Toggle from '../../components/ui/Toggle.jsx'
import LanguageSwitcher from '../../components/ui/LanguageSwitcher.jsx'
import Button from '../../components/ui/Button.jsx'
import { useUiStore } from '../../store/useUiStore.js'
import { useUserStore } from '../../store/useUserStore.js'
import { useToast } from '../../hooks/useToast.js'

export default function SettingsScreen() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const toast = useToast()
  const theme = useUiStore((s) => s.theme)
  const setTheme = useUiStore((s) => s.setTheme)
  const notifications = useUiStore((s) => s.notifications)
  const setNotification = useUiStore((s) => s.setNotification)
  const phone = useUserStore((s) => s.phone)
  const setPhone = useUserStore((s) => s.setPhone)
  const logout = useUserStore((s) => s.logout)

  const [phoneInput, setPhoneInput] = useState(phone || '')

  const savePhone = (e) => {
    e.preventDefault()
    setPhone(phoneInput.trim())
    toast(t('profile:phone.saved'), { tone: 'success' })
  }

  const THEMES = [
    { key: 'light', label: t('profile:theme.light') },
    { key: 'dark', label: t('profile:theme.dark') },
    { key: 'system', label: t('profile:theme.system') },
  ]

  return (
    <>
      <AppHeader back title={t('profile:settings')} />
      <Page>
        <Section title={t('profile:language')}>
          <LanguageSwitcher />
        </Section>

        <Section title={t('profile:theme')}>
          <div className="segmented">
            {THEMES.map((th) => (
              <button
                key={th.key}
                className={'segmented__item' + (theme === th.key ? ' is-active' : '')}
                onClick={() => setTheme(th.key)}
              >
                {th.label}
              </button>
            ))}
          </div>
        </Section>

        <Section title={t('profile:phone.title')}>
          <form className="phone-form" onSubmit={savePhone}>
            <input
              className="input"
              type="tel"
              inputMode="tel"
              placeholder={t('profile:phone.placeholder')}
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              aria-label={t('profile:phone.title')}
            />
            <Button type="submit" variant="secondary">
              {t('profile:phone.save')}
            </Button>
          </form>
          <p className="t-caption">{t('profile:phone.hint')}</p>
        </Section>

        <Section title={t('profile:notifications')}>
          <div className="card settings-toggles">
            <Toggle
              id="notif-orders"
              label={t('profile:notif.orders')}
              checked={notifications.orders}
              onChange={(v) => setNotification('orders', v)}
            />
            <Toggle
              id="notif-promos"
              label={t('profile:notif.promos')}
              checked={notifications.promos}
              onChange={(v) => setNotification('promos', v)}
            />
          </div>
        </Section>

        <Button variant="secondary" fullWidth onClick={() => { logout(); navigate('/auth') }}>
          {t('profile:logout')}
        </Button>
      </Page>
    </>
  )
}
