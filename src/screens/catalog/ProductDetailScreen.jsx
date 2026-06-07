import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from '../../components/layout/AppHeader.jsx'
import Page from '../../components/layout/Page.jsx'
import Section from '../../components/layout/Section.jsx'
import Thumb from '../../components/product/Thumb.jsx'
import PriceTag from '../../components/product/PriceTag.jsx'
import FavoriteButton from '../../components/product/FavoriteButton.jsx'
import ProductCard from '../../components/product/ProductCard.jsx'
import SupplierInfo from '../../components/farmer/SupplierInfo.jsx'
import QtyStepper from '../../components/ui/QtyStepper.jsx'
import Button from '../../components/ui/Button.jsx'
import EmptyState from '../../components/feedback/EmptyState.jsx'
import { useLang } from '../../hooks/useLang.js'
import { useMoney } from '../../hooks/useMoney.js'
import { formatSize } from '../../utils/format.js'
import { useCartStore } from '../../store/useCartStore.js'
import { useToast } from '../../hooks/useToast.js'
import {
  getProduct,
  getFarmer,
  getRelatedProducts,
  localizeEntity,
  localizeList,
} from '../../data/index.js'

export default function ProductDetailScreen() {
  const { productId } = useParams()
  const { t } = useTranslation()
  const lng = useLang()
  const money = useMoney()
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const toast = useToast()
  const [qty, setQty] = useState(1)

  // Reset quantity when navigating to another product (e.g. via "related").
  useEffect(() => setQty(1), [productId])

  const raw = getProduct(productId)
  if (!raw) {
    return (
      <>
        <AppHeader back />
        <Page>
          <EmptyState icon="search" title={t('catalog:empty.title')} />
        </Page>
      </>
    )
  }

  const product = localizeEntity(raw, lng)
  const farmer = localizeEntity(getFarmer(raw.farmerId), lng)
  const related = localizeList(getRelatedProducts(raw, 4), lng)

  const addToCart = () => {
    addItem(product.id, qty)
    toast(t('product:addedToast'), { tone: 'success' })
  }

  return (
    <>
      <AppHeader back right={<FavoriteButton productId={product.id} />} />
      <Page key={product.id} className="product-detail">
        <Thumb icon={product.icon} tone={product.tone} shape="cover" ariaLabel={product.name} />

        <div className="pd-head">
          <h1 className="t-h1">{product.name}</h1>
          <p className="t-muted">{product.description}</p>
          <div className="pd-price">
            <PriceTag amount={product.price} />
            <span className="t-caption">· {formatSize(product.size, t)}</span>
          </div>
        </div>

        <div className="pd-facts card">
          <div className="pd-fact">
            <span className="t-caption">{t('common:label.composition')}</span>
            <span>{product.composition}</span>
          </div>
          <div className="pd-fact">
            <span className="t-caption">{t('common:label.weight')}</span>
            <span>{formatSize(product.size, t)}</span>
          </div>
          <div className="pd-fact">
            <span className="t-caption">{t('common:label.shelfLife')}</span>
            <span>{product.shelfLife}</span>
          </div>
        </div>

        {/* Supplier (scenario 2: product -> read supplier card) */}
        <SupplierInfo farmer={farmer} />

        {related.length > 0 && (
          <Section title={t('product:related')}>
            <div className="catalog-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Section>
        )}
      </Page>

      {/* Sticky add-to-cart bar */}
      <div className="pd-bar">
        <QtyStepper value={qty} onInc={() => setQty(qty + 1)} onDec={() => setQty(Math.max(1, qty - 1))} />
        <Button fullWidth onClick={addToCart}>
          {t('common:button.addToCart')} · {money(product.price * qty)}
        </Button>
      </div>
    </>
  )
}
