import { useTranslation } from 'react-i18next'
import { useCartStore } from '../../store/useCartStore.js'
import { useToast } from '../../hooks/useToast.js'

// Adds to cart and shows a confirmation toast. `compact` renders an icon-only "+".
export default function AddToCartButton({ productId, qty = 1, compact = false, label }) {
  const { t } = useTranslation()
  const addItem = useCartStore((s) => s.addItem)
  const inCart = useCartStore((s) => s.items.some((i) => i.productId === productId))
  const toast = useToast()

  const handle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(productId, qty)
    toast(t('product:addedToast', 'Добавлено в корзину'), { tone: 'success' })
  }

  if (compact) {
    return (
      <button
        type="button"
        className={'add-compact' + (inCart ? ' is-incart' : '')}
        aria-label={t('common:button.addToCart')}
        onClick={handle}
      >
        {inCart ? '✓' : '+'}
      </button>
    )
  }

  return (
    <button type="button" className="btn btn--primary btn--md add-btn" onClick={handle}>
      {label || t('common:button.addToCart')}
    </button>
  )
}
