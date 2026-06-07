import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useFavoritesStore } from '../../store/useFavoritesStore.js'
import Icon from '../ui/Icon.jsx'
import { gsap, useGSAP } from '../../lib/gsap.js'
import { prefersReducedMotion } from '../../lib/motion.js'

// One-tap favorite (diploma scenario 6). No dialog. `stopPropagation` so it works
// inside a clickable card without triggering navigation. Pops the heart on activate.
export default function FavoriteButton({ productId, size = 'md' }) {
  const { t } = useTranslation()
  const isFav = useFavoritesStore((s) => s.ids.includes(productId))
  const toggle = useFavoritesStore((s) => s.toggle)
  const ref = useRef(null)
  const { contextSafe } = useGSAP({ scope: ref })

  const handle = contextSafe((e) => {
    e.preventDefault()
    e.stopPropagation()
    const willFav = !isFav
    toggle(productId)
    if (willFav && !prefersReducedMotion()) {
      gsap.fromTo(
        ref.current,
        { scale: 1 },
        { scale: 1.35, duration: 0.13, yoyo: true, repeat: 1, ease: 'power1.inOut' },
      )
    }
  })

  return (
    <button
      ref={ref}
      type="button"
      className={'fav fav--' + size + (isFav ? ' is-active' : '')}
      aria-pressed={isFav}
      aria-label={t('product:favorite', 'В избранное')}
      onClick={handle}
    >
      <Icon name="heart" filled={isFav} size={20} strokeWidth={1.8} />
    </button>
  )
}
