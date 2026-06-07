import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { useCartStore } from '../../store/useCartStore.js'
import { PAYMENT } from '../../utils/constants.js'

export default function Step3Payment() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const payment = useCartStore((s) => s.payment)
  const setPayment = useCartStore((s) => s.setPayment)

  const OPTIONS = [
    { type: PAYMENT.CASH, icon: 'cash', title: t('checkout:payment.cash') },
    { type: PAYMENT.CARD_ON_DELIVERY, icon: 'card', title: t('checkout:payment.card') },
  ]

  return (
    <div className="checkout-step">
      <h2 className="t-h3">{t('checkout:payment.title')}</h2>
      <div className="option-list">
        {OPTIONS.map((o) => (
          <button
            key={o.type}
            type="button"
            className={'option card' + (payment === o.type ? ' is-active' : '')}
            onClick={() => setPayment(o.type)}
          >
            <span className="option__icon" aria-hidden="true"><Icon name={o.icon} size={24} /></span>
            <span className="option__body">
              <strong>{o.title}</strong>
            </span>
            <span className={'radio' + (payment === o.type ? ' radio--on' : '')} aria-hidden="true">
              {payment === o.type && <Icon name="check" size={14} strokeWidth={2.4} />}
            </span>
          </button>
        ))}
        {/* Online payment — post-MVP, disabled */}
        <div className="option card is-disabled" aria-disabled="true">
          <span className="option__icon" aria-hidden="true"><Icon name="globe" size={24} /></span>
          <span className="option__body">
            <strong>{t('checkout:payment.online')}</strong>
          </span>
          <Badge tone="neutral">{t('checkout:payment.onlineSoon')}</Badge>
        </div>
      </div>

      <div className="checkout-step__actions">
        <Button fullWidth size="lg" disabled={!payment} onClick={() => navigate('/checkout/confirm')}>
          {t('common:button.next')}
        </Button>
      </div>
    </div>
  )
}
