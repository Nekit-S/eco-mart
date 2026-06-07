import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useUiStore } from '../store/useUiStore.js'
import { useOrdersStore } from '../store/useOrdersStore.js'

// Root route element: global side-effects (theme bootstrap + OS-scheme sync + order
// seeding) and scroll-to-top on navigation. Renders the nested layout/screen.
export default function App() {
  const theme = useUiStore((s) => s.theme)
  const setTheme = useUiStore((s) => s.setTheme)
  const syncSystem = useUiStore((s) => s.syncSystem)
  const { pathname } = useLocation()

  useEffect(() => {
    setTheme(theme)
    useOrdersStore.getState().seedIfEmpty()
    const m = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => syncSystem()
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Reset scroll to the top of the active screen on every navigation (incl. switching
  // between products via "related" — same route, changing param).
  useEffect(() => {
    const el = document.querySelector('.app-main')
    if (el) el.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return <Outlet />
}
