import { Outlet } from 'react-router-dom'
import BottomTabBar from '../navigation/BottomTabBar.jsx'
import ToastHost from '../components/ui/Toast.jsx'

// Layout for the 5 root tabs. Screens render their own sticky AppHeader; this provides
// the scroll area + bottom tab bar + toast host.
export default function TabLayout() {
  return (
    <div className="app-shell">
      <main className="app-main app-main--tabs">
        <Outlet />
      </main>
      <BottomTabBar />
      <ToastHost />
    </div>
  )
}
