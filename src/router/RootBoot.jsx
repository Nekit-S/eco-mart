import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useUiStore } from '../store/useUiStore.js'
import SplashScreen from '../screens/splash/SplashScreen.jsx'

// Index route ('/'): returning users (onboarding done) go straight to Home; first-time
// users see a brief splash, then onboarding.
export default function RootBoot() {
  const onboardingSeen = useUiStore((s) => s.onboardingSeen)
  const [splashDone, setSplashDone] = useState(false)

  useEffect(() => {
    if (onboardingSeen) return
    const id = setTimeout(() => setSplashDone(true), 1100)
    return () => clearTimeout(id)
  }, [onboardingSeen])

  if (onboardingSeen) return <Navigate to="/home" replace />
  if (!splashDone) return <SplashScreen />
  return <Navigate to="/onboarding" replace />
}
