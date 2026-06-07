import { useTranslation } from 'react-i18next'
import { useFavoritesStore } from '../../store/useFavoritesStore.js'

// One-tap favorite (diploma scenario 6). No dialog. `stopPropagation` so it works
// inside a clickable card without triggering navigation.
export default function FavoriteButton({ productId, size = 'md' }) {
  const { t } = useTranslation()
  const isFav = useFavoritesStore((s) => s.ids.includes(productId))
  const toggle = useFavoritesStore((s) => s.toggle)

  return (
    <button
      type="button"
      className={'fav fav--' + size + (isFav ? ' is-active' : '')}
      aria-pressed={isFav}
      aria-label={t('product:favorite', 'В избранное')}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(productId)
      }}
    >
      {isFav ? '♥' : '♡'}
    </button>
  )
}
