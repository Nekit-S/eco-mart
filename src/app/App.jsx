import { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUiStore } from '../store/useUiStore.js'
import ThemeToggle from '../components/ui/ThemeToggle.jsx'
import LanguageSwitcher from '../components/ui/LanguageSwitcher.jsx'

// M1–M2 shell. Theme bootstrap + OS-scheme sync live here; the real bottom-tab
// layout (TabLayout) replaces this header/nav in M5.
export default function App() {
  const { t } = useTranslation()
  const theme = useUiStore((s) => s.theme)
  const setTheme = useUiStore((s) => s.setTheme)
  const syncSystem = useUiStore((s) => s.syncSystem)

  useEffect(() => {
    setTheme(theme)
    const m = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => syncSystem()
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="app-shell" style={{ padding: 16 }}>
      <header
        className="app-header"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}
      >
        <strong className="t-h3">{t('common:app.name')}</strong>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LanguageSwitcher compact />
          <ThemeToggle />
        </div>
      </header>
      <nav style={{ display: 'flex', gap: 16, margin: '8px 0 16px' }}>
        <Link to="/">{t('nav:home')}</Link>
        <Link to="/catalog">{t('nav:catalog')}</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
