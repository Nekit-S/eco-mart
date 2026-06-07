import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from '../../components/layout/AppHeader.jsx'
import Page from '../../components/layout/Page.jsx'
import { useUserStore } from '../../store/useUserStore.js'

export default function ProfileScreen() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const user = useUserStore()

  const MENU = [
    { emoji: '🧾', label: t('profile:myOrders'), to: '/orders' },
    { emoji: '♥', label: t('profile:favorites'), to: '/favorites' },
    { emoji: '💬', label: t('profile:support'), to: '/support' },
    { emoji: '⚙️', label: t('profile:settings'), to: '/profile/settings' },
  ]

  return (
    <>
      <AppHeader title={t('profile:title')} />
      <Page>
        <div className="profile-card card">
          <span className="profile-card__avatar" aria-hidden="true">👤</span>
          <div>
            <strong>{user.isGuest || !user.phone ? t('profile:guest') : user.phone}</strong>
            <p className="t-caption">{t('common:app.tagline')}</p>
          </div>
        </div>

        <div className="menu card">
          {MENU.map((m) => (
            <button key={m.to} className="menu__row" onClick={() => navigate(m.to)}>
              <span className="menu__emoji" aria-hidden="true">{m.emoji}</span>
              <span className="menu__label">{m.label}</span>
              <span className="menu__chev" aria-hidden="true">›</span>
            </button>
          ))}
        </div>
      </Page>
    </>
  )
}
