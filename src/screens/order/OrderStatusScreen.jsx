import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from '../../components/layout/AppHeader.jsx'
import Page from '../../components/layout/Page.jsx'
import Button from '../../components/ui/Button.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import EmptyState from '../../components/feedback/EmptyState.jsx'
import { useLang } from '../../hooks/useLang.js'
import { useMoney } from '../../hooks/useMoney.js'
import { useOrdersStore } from '../../store/useOrdersStore.js'
import { localizeEntity } from '../../data/index.js'
import {
  ORDER_STATUS,
  STATUS_FLOW_DELIVERY,
  STATUS_FLOW_PICKUP,
  FULFILLMENT,
} from '../../utils/constants.js'

export default function OrderStatusScreen() {
  const { orderId } = useParams()
  const { t } = useTranslation()
  const lng = useLang()
  const money = useMoney()
  const navigate = useNavigate()
  const order = useOrdersStore((s) => s.orders.find((o) => o.id === orderId) || null)
  const advanceStatus = useOrdersStore((s) => s.advanceStatus)

  if (!order) {
    return (
      <>
        <AppHeader back />
        <Page>
          <EmptyState emoji="🧭" title={t('order:history.empty')} />
        </Page>
      </>
    )
  }

  const cancelled = order.status === ORDER_STATUS.CANCELLED
  const flow =
    order.fulfillment?.type === FULFILLMENT.PICKUP ? STATUS_FLOW_PICKUP : STATUS_FLOW_DELIVERY
  const currentIndex = flow.indexOf(order.status)
  const isFinal = order.status === ORDER_STATUS.COMPLETED || cancelled

  return (
    <>
      <AppHeader back title={t('order:number', { id: order.id })} />
      <Page>
        <div className="order-head card">
          <StatusBadge status={order.status} />
          {!cancelled && <span className="t-caption">{t('order:eta')}</span>}
        </div>

        {/* Status tracker */}
        {cancelled ? (
          <div className="card track track--cancelled">
            <span aria-hidden="true">✕</span> {t('order:status.cancelled')}
          </div>
        ) : (
          <ol className="track card">
            {flow.map((st, i) => (
              <li
                key={st}
                className={
                  'track__step ' +
                  (i < currentIndex ? 'is-done' : i === currentIndex ? 'is-current' : 'is-todo')
                }
              >
                <span className="track__dot" aria-hidden="true">{i <= currentIndex ? '✓' : ''}</span>
                <span>{t(`order:status.${st}`)}</span>
              </li>
            ))}
          </ol>
        )}

        {/* Items */}
        <div className="card confirm-block">
          {order.items.map((it, i) => (
            <div key={i} className="confirm-item">
              <span aria-hidden="true">{it.emoji}</span>
              <span className="confirm-item__name">
                {localizeEntity(it, lng).name} × {it.qty}
              </span>
              <span>{money(it.priceSnapshot * it.qty)}</span>
            </div>
          ))}
          <div className="summary__row summary__row--total">
            <span>{t('common:label.total')}</span>
            <strong className="t-price">{money(order.total)}</strong>
          </div>
        </div>

        {!isFinal && (
          <Button variant="secondary" fullWidth onClick={() => advanceStatus(order.id)}>
            {t('order:advance')}
          </Button>
        )}
        <Button variant="ghost" fullWidth onClick={() => navigate('/home')}>
          {t('nav:home')}
        </Button>
      </Page>
    </>
  )
}
