import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { useLang } from '../../hooks/useLang.js'
import { useMoney } from '../../hooks/useMoney.js'
import {
  useCartStore,
  buildSnapshotItems,
  selectSubtotal,
  selectDiscount,
  selectTotal,
} from '../../store/useCartStore.js'
import { useOrdersStore } from '../../store/useOrdersStore.js'
import { localizeEntity, getPickupPoint } from '../../data/index.js'
import { FULFILLMENT } from '../../utils/constants.js'

export default function Step4Confirm() {
  const { t } = useTranslation()
  const lng = useLang()
  const money = useMoney()
  const navigate = useNavigate()

  // Select primitives/stable refs individually (no fresh-object selectors → no loop).
  const items = useCartStore((s) => s.items)
  const fulfillmentType = useCartStore((s) => s.fulfillment)
  const address = useCartStore((s) => s.address)
  const addressCoords = useCartStore((s) => s.addressCoords)
  const pickupPointId = useCartStore((s) => s.pickupPointId)
  const timeSlot = useCartStore((s) => s.timeSlot)
  const payment = useCartStore((s) => s.payment)
  const promoCode = useCartStore((s) => s.promoCode)
  const subtotal = useCartStore(selectSubtotal)
  const discount = useCartStore(selectDiscount)
  const total = useCartStore(selectTotal)
  const clear = useCartStore((s) => s.clear)
  const createOrder = useOrdersStore((s) => s.createOrder)

  const snapshot = useMemo(() => buildSnapshotItems(items), [items])
  const isPickup = fulfillmentType === FULFILLMENT.PICKUP
  const point = isPickup ? localizeEntity(getPickupPoint(pickupPointId), lng) : null

  const place = () => {
    const fulfillment = isPickup
      ? { type: FULFILLMENT.PICKUP, pickupPointId, timeSlot }
      : { type: FULFILLMENT.DELIVERY, address, coords: addressCoords }
    const order = createOrder({
      items: snapshot,
      subtotal,
      discount,
      total,
      promoCode,
      fulfillment,
      payment,
    })
    clear()
    navigate(`/orders/${order.id}`, { replace: true })
  }

  return (
    <div className="checkout-step">
      <h2 className="t-h3">{t('checkout:confirm.title')}</h2>

      <div className="card confirm-block">
        {snapshot.map((it) => (
          <div key={it.productId} className="confirm-item">
            <span className={'mini-thumb mini-thumb--' + (it.tone || 'brown')} aria-hidden="true">
              <Icon name={it.icon} size={18} strokeWidth={1.8} />
            </span>
            <span className="confirm-item__name">
              {localizeEntity(it, lng).name} × {it.qty}
            </span>
            <span>{money(it.priceSnapshot * it.qty)}</span>
          </div>
        ))}
      </div>

      <div className="card confirm-block">
        <div className="confirm-row">
          <span className="t-caption">
            {isPickup ? t('checkout:confirm.pickupAt') : t('checkout:confirm.deliverTo')}
          </span>
          <span>
            {isPickup
              ? point
                ? `${point.name} · ${t('checkout:timeReady', { time: timeSlot })}`
                : t('checkout:validation.pickup')
              : address + (addressCoords ? ` (${addressCoords.lat}, ${addressCoords.lng})` : '')}
          </span>
        </div>
        <div className="confirm-row">
          <span className="t-caption">{t('checkout:payment.title')}</span>
          <span>
            {payment === 'cash' ? t('checkout:payment.cash') : t('checkout:payment.card')}
          </span>
        </div>
      </div>

      <div className="summary card">
        <div className="summary__row">
          <span className="t-muted">{t('common:label.subtotal')}</span>
          <span>{money(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="summary__row summary__row--discount">
            <span>{t('common:label.discount')}</span>
            <span>−{money(discount)}</span>
          </div>
        )}
        <div className="summary__row summary__row--total">
          <span>{t('common:label.total')}</span>
          <strong className="t-price">{money(total)}</strong>
        </div>
      </div>

      <div className="checkout-step__actions">
        <Button fullWidth size="lg" onClick={place}>
          {t('checkout:confirm.place')}
        </Button>
      </div>
    </div>
  )
}
