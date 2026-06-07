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

export default function SettingsScreen() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const theme = useUiStore((s) => s.theme)
  const setTheme = useUiStore((s) => s.setTheme)
  const notifications = useUiStore((s) => s.notifications)
  const setNotification = useUiStore((s) => s.setNotification)
  const demoTimer = useUiStore((s) => s.demoTimer)
  const setDemoTimer = useUiStore((s) => s.setDemoTimer)
  const logout = useUserStore((s) => s.logout)

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
            <Toggle
              id="demo-timer"
              label={t('profile:demoTimer')}
              checked={demoTimer}
              onChange={setDemoTimer}
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
