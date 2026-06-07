import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TABS } from './tabs.config.js'
import { useCartStore, selectCount } from '../store/useCartStore.js'

export default function BottomTabBar() {
  const { t } = useTranslation()
  const cartCount = useCartStore(selectCount)

  return (
    <nav className="tabbar" aria-label="Основная навигация">
      {TABS.map((tab) => (
        <NavLink
          key={tab.key}
          to={tab.path}
          className={({ isActive }) => 'tabbar__item' + (isActive ? ' is-active' : '')}
        >
          <span className="tabbar__icon" aria-hidden="true">
            {tab.icon}
            {tab.key === 'cart' && cartCount > 0 && (
              <span className="tabbar__badge">{cartCount}</span>
            )}
          </span>
          <span className="tabbar__label">{t(tab.labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  )
}
