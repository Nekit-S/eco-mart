import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from '../../components/layout/AppHeader.jsx'
import Page from '../../components/layout/Page.jsx'
import Button from '../../components/ui/Button.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import EmptyState from '../../components/feedback/EmptyState.jsx'
import { useLang } from '../../hooks/useLang.js'
import { useMoney } from '../../hooks/useMoney.js'
import { formatDate } from '../../utils/format.js'
import { localeMap } from '../../i18n/localeMap.js'
import { localizeEntity } from '../../data/index.js'
import { useOrdersStore } from '../../store/useOrdersStore.js'
import { useCartStore } from '../../store/useCartStore.js'

export default function OrderHistoryScreen() {
  const { t } = useTranslation()
  const lng = useLang()
  const money = useMoney()
  const navigate = useNavigate()
  const orders = useOrdersStore((s) => s.orders)
  const replaceFromOrder = useCartStore((s) => s.replaceFromOrder)

  const repeat = (order) => {
    replaceFromOrder(order)
    navigate('/checkout/fulfillment')
  }

  if (!orders.length) {
    return (
      <>
        <AppHeader title={t('order:history.title')} />
        <Page>
          <EmptyState emoji="🧾" title={t('order:history.empty')} />
        </Page>
      </>
    )
  }

  return (
    <>
      <AppHeader title={t('order:history.title')} />
      <Page>
        <div className="order-list">
          {orders.map((o) => (
            <div key={o.id} className="order-row card">
              <div className="order-row__top">
                <strong>{t('order:number', { id: o.id })}</strong>
                <StatusBadge status={o.status} />
              </div>
              <span className="t-caption">
                {formatDate(o.createdAt, localeMap[lng])} ·{' '}
                {o.items.map((it) => localizeEntity(it, lng).name).join(', ')}
              </span>
              <div className="order-row__bottom">
                <strong className="t-price">{money(o.total)}</strong>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button size="sm" variant="secondary" onClick={() => navigate(`/orders/${o.id}`)}>
                    {t('order:trackTitle')}
                  </Button>
                  <Button size="sm" onClick={() => repeat(o)}>
                    {t('common:button.repeat')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Page>
    </>
  )
}
