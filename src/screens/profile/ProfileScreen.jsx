import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from '../../components/layout/AppHeader.jsx'
import Page from '../../components/layout/Page.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { useUserStore } from '../../store/useUserStore.js'

export default function ProfileScreen() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const user = useUserStore()

  const MENU = [
    { icon: 'receipt', label: t('profile:myOrders'), to: '/orders' },
    { icon: 'heart', label: t('profile:favorites'), to: '/favorites' },
    { icon: 'chat', label: t('profile:support'), to: '/support' },
    { icon: 'settings', label: t('profile:settings'), to: '/profile/settings' },
  ]

  return (
    <>
      <AppHeader title={t('profile:title')} />
      <Page>
        <div className="profile-card card">
          <span className="profile-card__avatar" aria-hidden="true">
            <Icon name="user" size={26} />
          </span>
          <div>
            <strong>{user.isGuest || !user.phone ? t('profile:guest') : user.phone}</strong>
            <p className="t-caption">{t('common:app.tagline')}</p>
          </div>
        </div>

        <div className="menu card">
          {MENU.map((m) => (
            <button key={m.to} className="menu__row" onClick={() => navigate(m.to)}>
              <span className="menu__icon" aria-hidden="true"><Icon name={m.icon} size={20} /></span>
              <span className="menu__label">{m.label}</span>
              <Icon name="chevronRight" size={20} className="menu__chev" />
            </button>
          ))}
        </div>
      </Page>
    </>
  )
}
