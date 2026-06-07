import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from '../../components/layout/AppHeader.jsx'
import WizardStepper from '../../components/ui/WizardStepper.jsx'

const STEP_KEYS = ['fulfillment', 'where', 'payment', 'confirm']

export default function CheckoutLayout() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const currentIndex = Math.max(
    0,
    STEP_KEYS.findIndex((k) => pathname.endsWith(`/${k}`)),
  )
  const steps = STEP_KEYS.map((k) => ({ key: k, label: t(`checkout:step.${k}`) }))

  return (
    <>
      <AppHeader back title={t('checkout:title')} />
      <div className="checkout">
        <WizardStepper steps={steps} currentIndex={currentIndex} />
        <Outlet />
      </div>
    </>
  )
}
