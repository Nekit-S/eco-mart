import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from '../../components/layout/AppHeader.jsx'
import Page from '../../components/layout/Page.jsx'
import Section from '../../components/layout/Section.jsx'
import Thumb from '../../components/product/Thumb.jsx'
import ProductCard from '../../components/product/ProductCard.jsx'
import Badge from '../../components/ui/Badge.jsx'
import EmptyState from '../../components/feedback/EmptyState.jsx'
import { useLang } from '../../hooks/useLang.js'
import { getFarmer, getProductsByFarmer, localizeEntity, localizeList } from '../../data/index.js'
import { gsap, useGSAP } from '../../lib/gsap.js'

// Three scrollable sections satisfy diploma scenario 5 (≥2 screens about a supplier).
export default function FarmerDetailScreen() {
  const { farmerId } = useParams()
  const { t } = useTranslation()
  const lng = useLang()

  const raw = getFarmer(farmerId)
  if (!raw) {
    return (
      <>
        <AppHeader back />
        <Page>
          <EmptyState emoji="🧭" title={t('farmer:empty')} />
        </Page>
      </>
    )
  }

  const farmer = localizeEntity(raw, lng)
  const products = localizeList(getProductsByFarmer(farmerId), lng)

  // Stagger the supplier sections in on mount (reduced-motion → shown instantly).
  const revealRef = useRef(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        { reduce: '(prefers-reduced-motion: reduce)', ok: '(prefers-reduced-motion: no-preference)' },
        (ctx) => {
          if (ctx.conditions.reduce) {
            gsap.set('.reveal', { autoAlpha: 1, y: 0 })
            return
          }
          gsap.from('.reveal', { autoAlpha: 0, y: 22, stagger: 0.12, duration: 0.35 })
        },
      )
    },
    { scope: revealRef, dependencies: [farmerId, lng] },
  )

  return (
    <>
      <AppHeader back title={farmer.name} />
      <Page entrance="none">
        <div ref={revealRef} style={{ display: 'contents' }}>
          <Thumb className="reveal" emoji={farmer.emoji} tone={farmer.tone} shape="cover" ariaLabel={farmer.name} />

          {/* Section 1 — intro */}
          <Section title={t('farmer:section.intro')} className="reveal">
          <div className="farmer-meta">
            <Badge tone="brand">📍 {farmer.region}</Badge>
            <Badge tone="neutral">{t('farmer:since', { year: farmer.established })}</Badge>
            {farmer.farmerOfWeek && <Badge tone="accent">⭐ {t('farmer:ofWeek')}</Badge>}
          </div>
          <p className="t-body">{farmer.short}</p>
        </Section>

        {/* Section 2 — story & region */}
        <Section title={t('farmer:section.story')} className="reveal">
          <p className="t-body farmer-story">{farmer.story}</p>
        </Section>

        {/* Section 3 — products */}
        <Section title={t('farmer:section.products')} className="reveal">
            <div className="catalog-grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Section>
        </div>
      </Page>
    </>
  )
}
