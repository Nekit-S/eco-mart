import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useUiStore } from '../store/useUiStore.js'
import { useOrdersStore } from '../store/useOrdersStore.js'
import DemoTimer from '../components/dev/DemoTimer.jsx'

// Root route element: global side-effects (theme bootstrap + OS-scheme sync + order
// seeding) then renders the nested layout/screen via <Outlet/>.
export default function App() {
  const theme = useUiStore((s) => s.theme)
  const setTheme = useUiStore((s) => s.setTheme)
  const syncSystem = useUiStore((s) => s.syncSystem)

  useEffect(() => {
    setTheme(theme)
    useOrdersStore.getState().seedIfEmpty()
    const m = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => syncSystem()
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Outlet />
      <DemoTimer />
    </>
  )
}
