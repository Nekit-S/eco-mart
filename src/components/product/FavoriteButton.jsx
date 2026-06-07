import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFavoritesStore } from '../../store/useFavoritesStore.js'
import { gsap, useGSAP } from '../../lib/gsap.js'
import { prefersReducedMotion } from '../../lib/motion.js'

const HEART =
  'M12 20.4C12 20.4 3.6 14.8 3.6 9 C3.6 6.2 5.8 4.1 8.4 4.1 C10.1 4.1 11.4 5 12 6.2 C12.6 5 13.9 4.1 15.6 4.1 C18.2 4.1 20.4 6.2 20.4 9 C20.4 14.8 12 20.4 12 20.4 Z'

// One-tap favorite (diploma scenario 6). On activate the heart outline is "embroidered"
// (DrawSVG traces the contour) with the fill hidden, then the fill blooms in + a pop.
// Fill is driven by React state so it reliably stays hidden during the draw.
export default function FavoriteButton({ productId, size = 'md' }) {
  const { t } = useTranslation()
  const isFav = useFavoritesStore((s) => s.ids.includes(productId))
  const toggle = useFavoritesStore((s) => s.toggle)
  const btnRef = useRef(null)
  const pathRef = useRef(null)
  const [drawing, setDrawing] = useState(false)
  const { contextSafe } = useGSAP({ scope: btnRef })

  const handleClick = contextSafe((e) => {
    e.preventDefault()
    e.stopPropagation()
    const willFav = !isFav
    toggle(productId)
    if (willFav && !prefersReducedMotion()) {
      setDrawing(true)
      gsap.fromTo(
        pathRef.current,
        { drawSVG: 0 },
        {
          drawSVG: '100%',
          duration: 0.5,
          ease: 'power1.inOut',
          onComplete: () => setDrawing(false),
        },
      )
      gsap.fromTo(btnRef.current, { scale: 0.8 }, { scale: 1, duration: 0.45, ease: 'back.out(3)' })
    }
  })

  // fill is visible only when favorited AND not mid-draw
  const fillOpacity = drawing ? 0 : isFav ? 1 : 0

  return (
    <button
      ref={btnRef}
      type="button"
      className={'fav fav--' + size + (isFav ? ' is-active' : '')}
      aria-pressed={isFav}
      aria-label={t('product:favorite', 'В избранное')}
      onClick={handleClick}
    >
      <svg
        className="fav-heart"
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path ref={pathRef} d={HEART} style={{ fillOpacity }} />
      </svg>
    </button>
  )
}
