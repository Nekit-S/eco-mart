import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from '../../components/layout/AppHeader.jsx'
import Page from '../../components/layout/Page.jsx'
import Thumb from '../../components/product/Thumb.jsx'
import QtyStepper from '../../components/ui/QtyStepper.jsx'
import Button from '../../components/ui/Button.jsx'
import EmptyState from '../../components/feedback/EmptyState.jsx'
import { useLang } from '../../hooks/useLang.js'
import { useMoney } from '../../hooks/useMoney.js'
import { getProduct, localizeEntity } from '../../data/index.js'
import {
  useCartStore,
  selectSubtotal,
  selectDiscount,
  selectTotal,
} from '../../store/useCartStore.js'

export default function CartScreen() {
  const { t } = useTranslation()
  const lng = useLang()
  const money = useMoney()
  const navigate = useNavigate()

  const items = useCartStore((s) => s.items)
  const incQty = useCartStore((s) => s.incQty)
  const decQty = useCartStore((s) => s.decQty)
  const removeItem = useCartStore((s) => s.removeItem)
  const promoCode = useCartStore((s) => s.promoCode)
  const applyPromo = useCartStore((s) => s.applyPromo)
  const clearPromo = useCartStore((s) => s.clearPromo)
  const subtotal = useCartStore(selectSubtotal)
  const discount = useCartStore(selectDiscount)
  const total = useCartStore(selectTotal)

  const [promoInput, setPromoInput] = useState('')
  const [promoMsg, setPromoMsg] = useState(null) // {ok, text}

  const submitPromo = (e) => {
    e.preventDefault()
    if (!promoInput.trim()) return
    const res = applyPromo(promoInput)
    if (res.ok) setPromoMsg({ ok: true, text: t('cart:promo.applied') })
    else setPromoMsg({ ok: false, text: t(`cart:promo.${res.error}`) })
  }

  if (!items.length) {
    return (
      <>
        <AppHeader title={t('cart:title')} />
        <Page>
          <EmptyState
            emoji="🛒"
            title={t('cart:empty.title')}
            subtitle={t('cart:empty.sub')}
            action={<Button onClick={() => navigate('/catalog')}>{t('common:button.toCatalog')}</Button>}
          />
        </Page>
      </>
    )
  }

  return (
    <>
      <AppHeader title={t('cart:title')} />
      <Page>
        <div className="cart-list">
          {items.map((it) => {
            const p = localizeEntity(getProduct(it.productId), lng)
            if (!p) return null
            return (
              <div key={it.productId} className="cart-item card">
                <Thumb emoji={p.emoji} tone={p.tone} shape="circle" size={56} ariaLabel={p.name} />
                <div className="cart-item__body">
                  <strong className="cart-item__name">{p.name}</strong>
                  <span className="t-caption">{money(p.price)}</span>
                </div>
                <div className="cart-item__right">
                  <QtyStepper
                    value={it.qty}
                    size="sm"
                    onInc={() => incQty(it.productId)}
                    onDec={() => decQty(it.productId)}
                  />
                  <button className="cart-item__remove" onClick={() => removeItem(it.productId)}>
                    {t('common:button.remove')}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Promo */}
        <form className="promo" onSubmit={submitPromo}>
          <input
            className="input"
            placeholder={t('cart:promo.placeholder')}
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            aria-label={t('cart:promo.placeholder')}
          />
          <Button type="submit" variant="secondary">
            {t('common:button.apply')}
          </Button>
        </form>
        {promoMsg && (
          <p className={'promo-msg ' + (promoMsg.ok ? 'promo-msg--ok' : 'promo-msg--err')}>
            {promoMsg.text}
            {promoCode && promoMsg.ok && (
              <button className="promo-msg__clear" onClick={() => { clearPromo(); setPromoMsg(null); setPromoInput('') }}>
                ✕
              </button>
            )}
          </p>
        )}

        {/* Summary */}
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
      </Page>

      <div className="pd-bar">
        <Button fullWidth size="lg" onClick={() => navigate('/checkout')}>
          {t('cart:checkout')} · {money(total)}
        </Button>
      </div>
    </>
  )
}
