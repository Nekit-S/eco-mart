import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from '../../components/layout/AppHeader.jsx'
import Page from '../../components/layout/Page.jsx'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import EmptyState from '../../components/feedback/EmptyState.jsx'
import { useLang } from '../../hooks/useLang.js'
import { useMoney } from '../../hooks/useMoney.js'
import { useToast } from '../../hooks/useToast.js'
import { useOrdersStore } from '../../store/useOrdersStore.js'
import { useUserStore } from '../../store/useUserStore.js'
import { useUiStore } from '../../store/useUiStore.js'
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
  const toast = useToast()
  const phone = useUserStore((s) => s.phone)
  const notifyOrders = useUiStore((s) => s.notifications.orders)

  if (!order) {
    return (
      <>
        <AppHeader back />
        <Page>
          <EmptyState icon="receipt" title={t('order:history.empty')} />
        </Page>
      </>
    )
  }

  const cancelled = order.status === ORDER_STATUS.CANCELLED
  const flow =
    order.fulfillment?.type === FULFILLMENT.PICKUP ? STATUS_FLOW_PICKUP : STATUS_FLOW_DELIVERY
  const currentIndex = flow.indexOf(order.status)
  const isFinal = order.status === ORDER_STATUS.COMPLETED || cancelled

  // Advance the status, then simulate a WhatsApp status notification (front-end demo;
  // a real send needs a backend + WhatsApp Business API).
  const advance = () => {
    const nextStatus = flow[currentIndex + 1]
    advanceStatus(order.id)
    if (!notifyOrders || !nextStatus) return
    if (phone) toast(t('order:notifySent', { phone }), { tone: 'success' })
    else toast(t('order:notifyNoPhone'), { tone: 'neutral' })
  }

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
            <Icon name="x" size={18} strokeWidth={2.2} /> {t('order:status.cancelled')}
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
                <span className="track__dot" aria-hidden="true">
                  {i <= currentIndex && <Icon name="check" size={13} strokeWidth={2.6} />}
                </span>
                <span>{t(`order:status.${st}`)}</span>
              </li>
            ))}
          </ol>
        )}

        {/* Items */}
        <div className="card confirm-block">
          {order.items.map((it, i) => (
            <div key={i} className="confirm-item">
              <span className={'mini-thumb mini-thumb--' + (it.tone || 'brown')} aria-hidden="true">
                <Icon name={it.icon} size={18} strokeWidth={1.8} />
              </span>
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
          <Button variant="secondary" fullWidth onClick={advance}>
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
