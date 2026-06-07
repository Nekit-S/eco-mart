import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from '../../components/layout/AppHeader.jsx'
import Page from '../../components/layout/Page.jsx'
import CategoryChip from '../../components/ui/CategoryChip.jsx'
import ProductCard from '../../components/product/ProductCard.jsx'
import { SkeletonGrid } from '../../components/feedback/Skeleton.jsx'
import EmptyState from '../../components/feedback/EmptyState.jsx'
import { useLang } from '../../hooks/useLang.js'
import { getCategories, getProducts, localizeList } from '../../data/index.js'
import { gsap, useGSAP } from '../../lib/gsap.js'

export default function CatalogScreen() {
  const { t } = useTranslation()
  const lng = useLang()
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || 'all'
  const q = params.get('q') || ''
  const [loading, setLoading] = useState(true)

  // Brief skeleton on first mount (perceived performance — diploma §3.1).
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 280)
    return () => clearTimeout(id)
  }, [])

  const categories = localizeList(getCategories(), lng)

  const products = useMemo(() => {
    const all = localizeList(getProducts(), lng)
    return all.filter((p) => {
      const okCat = cat === 'all' || p.categoryId === cat
      const okQ = !q || p.name.toLowerCase().includes(q.toLowerCase())
      return okCat && okQ
    })
  }, [lng, cat, q])

  const setCat = (id) => {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('cat')
    else next.set('cat', id)
    setParams(next, { replace: true })
  }
  const setQ = (val) => {
    const next = new URLSearchParams(params)
    if (val) next.set('q', val)
    else next.delete('q')
    setParams(next, { replace: true })
  }

  // Stagger the cards in (re-runs when the result set or loading changes).
  const gridRef = useRef(null)
  useGSAP(
    () => {
      if (loading) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.product-card', { autoAlpha: 0, y: 18, stagger: 0.05, duration: 0.3 })
      })
    },
    { scope: gridRef, dependencies: [loading, cat, q, lng] },
  )

  return (
    <>
      <AppHeader title={t('catalog:title')} />
      <Page entrance="fade">
        <input
          className="input"
          type="search"
          placeholder={t('catalog:search')}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label={t('catalog:search')}
        />

        <div className="chip-row">
          <CategoryChip active={cat === 'all'} onClick={() => setCat('all')}>
            {t('catalog:all')}
          </CategoryChip>
          {categories.map((c) => (
            <CategoryChip
              key={c.id}
              emoji={c.emoji}
              active={cat === c.id}
              onClick={() => setCat(c.id)}
            >
              {c.name}
            </CategoryChip>
          ))}
        </div>

        <div ref={gridRef}>
          {loading ? (
            <SkeletonGrid count={6} />
          ) : products.length ? (
            <div className="catalog-grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <EmptyState emoji="🔍" title={t('catalog:empty.title')} subtitle={t('catalog:empty.sub')} />
          )}
        </div>
      </Page>
    </>
  )
}
