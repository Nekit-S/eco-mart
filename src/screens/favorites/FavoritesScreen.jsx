import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from '../../components/layout/AppHeader.jsx'
import Page from '../../components/layout/Page.jsx'
import ProductCard from '../../components/product/ProductCard.jsx'
import Button from '../../components/ui/Button.jsx'
import EmptyState from '../../components/feedback/EmptyState.jsx'
import { useLang } from '../../hooks/useLang.js'
import { getProduct, localizeEntity } from '../../data/index.js'
import { useFavoritesStore } from '../../store/useFavoritesStore.js'

export default function FavoritesScreen() {
  const { t } = useTranslation()
  const lng = useLang()
  const navigate = useNavigate()
  const ids = useFavoritesStore((s) => s.ids)

  const products = ids
    .map((id) => getProduct(id))
    .filter(Boolean)
    .map((p) => localizeEntity(p, lng))

  return (
    <>
      <AppHeader title={t('favorites:title')} />
      <Page>
        {products.length ? (
          <div className="catalog-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <EmptyState
            emoji="♡"
            title={t('favorites:empty.title')}
            subtitle={t('favorites:empty.sub')}
            action={<Button onClick={() => navigate('/catalog')}>{t('common:button.toCatalog')}</Button>}
          />
        )}
      </Page>
    </>
  )
}
