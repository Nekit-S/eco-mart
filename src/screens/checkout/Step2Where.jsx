import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { useLang } from '../../hooks/useLang.js'
import { useCartStore } from '../../store/useCartStore.js'
import { getPickupPoints, localizeList } from '../../data/index.js'
import { FULFILLMENT } from '../../utils/constants.js'

export default function Step2Where() {
  const { t } = useTranslation()
  const lng = useLang()
  const navigate = useNavigate()
  const fulfillment = useCartStore((s) => s.fulfillment)
  const address = useCartStore((s) => s.address)
  const setAddress = useCartStore((s) => s.setAddress)
  const pickupPointId = useCartStore((s) => s.pickupPointId)
  const setPickupPoint = useCartStore((s) => s.setPickupPoint)
  const timeSlot = useCartStore((s) => s.timeSlot)
  const setTimeSlot = useCartStore((s) => s.setTimeSlot)
  const [error, setError] = useState('')

  const points = localizeList(getPickupPoints(), lng)
  const selectedPoint = points.find((p) => p.id === pickupPointId)
  const isPickup = fulfillment === FULFILLMENT.PICKUP

  const next = () => {
    if (isPickup) {
      if (!pickupPointId || !timeSlot) return setError(t('checkout:validation.pickup'))
    } else if (!address.trim()) {
      return setError(t('checkout:validation.address'))
    }
    navigate('/checkout/payment')
  }

  return (
    <div className="checkout-step">
      {isPickup ? (
        <>
          <h2 className="t-h3">{t('checkout:pickup.title')}</h2>
          <div className="option-list">
            {points.map((p) => (
              <button
                key={p.id}
                type="button"
                className={'option card' + (pickupPointId === p.id ? ' is-active' : '')}
                onClick={() => setPickupPoint(p.id)}
              >
                <span className="option__icon" aria-hidden="true"><Icon name="store" size={24} /></span>
                <span className="option__body">
                  <strong>{p.name}</strong>
                  <span className="t-caption">{p.address} · {p.hours}</span>
                </span>
              </button>
            ))}
          </div>

          {selectedPoint && (
            <>
              <h2 className="t-h3">{t('checkout:pickup.time')}</h2>
              <div className="chip-row">
                {selectedPoint.slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={'chip' + (timeSlot === s ? ' chip--active' : '')}
                    onClick={() => setTimeSlot(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <h2 className="t-h3">{t('checkout:address.title')}</h2>
          <input
            className="input"
            placeholder={t('checkout:address.placeholder')}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            aria-label={t('checkout:address.title')}
          />
        </>
      )}

      {error && <p className="promo-msg promo-msg--err">{error}</p>}

      <div className="checkout-step__actions">
        <Button fullWidth size="lg" onClick={next}>
          {t('common:button.next')}
        </Button>
      </div>
    </div>
  )
}
