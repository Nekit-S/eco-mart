import { Outlet } from 'react-router-dom'
import ToastHost from '../components/ui/Toast.jsx'

// Layout for screens outside the tab bar (detail, checkout, order status, ...).
// Screens render their own AppHeader with a back button.
export default function PlainLayout() {
  return (
    <div className="app-shell">
      <main className="app-main">
        <Outlet />
      </main>
      <ToastHost />
    </div>
  )
}
