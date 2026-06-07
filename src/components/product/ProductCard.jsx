import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Thumb from './Thumb.jsx'
import PriceTag from './PriceTag.jsx'
import FavoriteButton from './FavoriteButton.jsx'
import AddToCartButton from './AddToCartButton.jsx'
import { formatSize } from '../../utils/format.js'

// Expects an ALREADY-LOCALIZED product (name/description are strings; size/emoji/tone
// preserved). The `.product-card` class is the GSAP stagger target (M9).
export default function ProductCard({ product }) {
  const { t } = useTranslation()
  return (
    <Link to={`/product/${product.id}`} className="product-card card">
      <div className="product-card__media">
        <Thumb icon={product.icon} tone={product.tone} ariaLabel={product.name} />
        <div className="product-card__fav">
          <FavoriteButton productId={product.id} />
        </div>
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="t-caption">{formatSize(product.size, t)}</p>
        <div className="product-card__foot">
          <PriceTag amount={product.price} />
          <AddToCartButton productId={product.id} compact />
        </div>
      </div>
    </Link>
  )
}
