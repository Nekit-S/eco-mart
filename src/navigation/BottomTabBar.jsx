import { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TABS } from './tabs.config.js'
import Icon from '../components/ui/Icon.jsx'
import { useCartStore, selectCount } from '../store/useCartStore.js'
import { gsap, useGSAP } from '../lib/gsap.js'

export default function BottomTabBar() {
  const { t } = useTranslation()
  const cartCount = useCartStore(selectCount)
  const ref = useRef(null)

  // Pop the cart badge whenever the count changes.
  useGSAP(
    () => {
      if (cartCount <= 0) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.tabbar__badge', { scale: 0.4 }, { scale: 1, duration: 0.3, ease: 'back.out(3)' })
      })
    },
    { scope: ref, dependencies: [cartCount] },
  )

  return (
    <nav className="tabbar" aria-label="Основная навигация" ref={ref}>
      {TABS.map((tab) => (
        <NavLink
          key={tab.key}
          to={tab.path}
          className={({ isActive }) => 'tabbar__item' + (isActive ? ' is-active' : '')}
        >
          <span className="tabbar__icon" aria-hidden="true">
            <Icon name={tab.icon} size={24} />
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
