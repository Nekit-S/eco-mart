import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCartStore } from '../../store/useCartStore.js'
import { FULFILLMENT } from '../../utils/constants.js'

export default function Step1Fulfillment() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const fulfillment = useCartStore((s) => s.fulfillment)
  const setFulfillment = useCartStore((s) => s.setFulfillment)

  const choose = (type) => {
    setFulfillment(type)
    navigate('/checkout/where')
  }

  const OPTIONS = [
    { type: FULFILLMENT.DELIVERY, emoji: '🛵', title: t('checkout:fulfillment.delivery'), desc: t('checkout:fulfillment.deliveryDesc') },
    { type: FULFILLMENT.PICKUP, emoji: '🏪', title: t('checkout:fulfillment.pickup'), desc: t('checkout:fulfillment.pickupDesc') },
  ]

  return (
    <div className="checkout-step">
      <h2 className="t-h3">{t('checkout:fulfillment.title')}</h2>
      <div className="option-list">
        {OPTIONS.map((o) => (
          <button
            key={o.type}
            type="button"
            className={'option card' + (fulfillment === o.type ? ' is-active' : '')}
            onClick={() => choose(o.type)}
          >
            <span className="option__emoji" aria-hidden="true">{o.emoji}</span>
            <span className="option__body">
              <strong>{o.title}</strong>
              <span className="t-caption">{o.desc}</span>
            </span>
            <span className="option__chev" aria-hidden="true">›</span>
          </button>
        ))}
      </div>
    </div>
  )
}
