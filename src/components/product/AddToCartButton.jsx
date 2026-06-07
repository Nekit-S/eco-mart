import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useCartStore } from '../../store/useCartStore.js'
import { useToast } from '../../hooks/useToast.js'
import Icon from '../ui/Icon.jsx'
import { gsap, useGSAP } from '../../lib/gsap.js'
import { prefersReducedMotion } from '../../lib/motion.js'

// Adds to cart and shows a confirmation toast. `compact` renders an icon-only "+",
// which pops on tap.
export default function AddToCartButton({ productId, qty = 1, compact = false, label }) {
  const { t } = useTranslation()
  const addItem = useCartStore((s) => s.addItem)
  const inCart = useCartStore((s) => s.items.some((i) => i.productId === productId))
  const toast = useToast()
  const ref = useRef(null)
  const { contextSafe } = useGSAP({ scope: ref })

  const handle = contextSafe((e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(productId, qty)
    toast(t('product:addedToast', 'Добавлено в корзину'), { tone: 'success' })
    if (!prefersReducedMotion()) {
      gsap.fromTo(ref.current, { scale: 1 }, { scale: 0.86, duration: 0.1, yoyo: true, repeat: 1 })
    }
  })

  if (compact) {
    return (
      <button
        ref={ref}
        type="button"
        className={'add-compact' + (inCart ? ' is-incart' : '')}
        aria-label={t('common:button.addToCart')}
        onClick={handle}
      >
        <Icon name={inCart ? 'check' : 'plus'} size={22} strokeWidth={2.2} />
      </button>
    )
  }

  return (
    <button ref={ref} type="button" className="btn btn--primary btn--md add-btn" onClick={handle}>
      {label || t('common:button.addToCart')}
    </button>
  )
}
