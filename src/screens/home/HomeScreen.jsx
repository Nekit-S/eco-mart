import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from '../../components/layout/AppHeader.jsx'
import Page from '../../components/layout/Page.jsx'
import Section from '../../components/layout/Section.jsx'
import CategoryChip from '../../components/ui/CategoryChip.jsx'
import ProductCard from '../../components/product/ProductCard.jsx'
import FarmerCard from '../../components/farmer/FarmerCard.jsx'
import LanguageSwitcher from '../../components/ui/LanguageSwitcher.jsx'
import ThemeToggle from '../../components/ui/ThemeToggle.jsx'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { useLang } from '../../hooks/useLang.js'
import { useMoney } from '../../hooks/useMoney.js'
import {
  getCategories,
  getPopularProducts,
  getFarmerOfWeek,
  localizeList,
  localizeEntity,
} from '../../data/index.js'
import { useOrdersStore, selectLastOrder } from '../../store/useOrdersStore.js'
import { useCartStore } from '../../store/useCartStore.js'
import { gsap, useGSAP } from '../../lib/gsap.js'

export default function HomeScreen() {
  const { t } = useTranslation()
  const lng = useLang()
  const money = useMoney()
  const navigate = useNavigate()

  const categories = localizeList(getCategories(), lng)
  const popular = localizeList(getPopularProducts(), lng).slice(0, 6)
  const farmer = localizeEntity(getFarmerOfWeek(), lng)
  const lastOrder = useOrdersStore(selectLastOrder)
  const replaceFromOrder = useCartStore((s) => s.replaceFromOrder)

  const repeat = () => {
    if (!lastOrder) return
    replaceFromOrder(lastOrder)
    navigate('/cart')
  }

  // Stagger the home sections in on mount (reduced-motion → shown instantly).
  const revealRef = useRef(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        { reduce: '(prefers-reduced-motion: reduce)', ok: '(prefers-reduced-motion: no-preference)' },
        (ctx) => {
          const kids = revealRef.current ? Array.from(revealRef.current.children) : []
          if (ctx.conditions.reduce) {
            gsap.set(kids, { autoAlpha: 1, y: 0 })
            return
          }
          gsap.from(kids, { autoAlpha: 0, y: 18, stagger: 0.07, duration: 0.32 })
        },
      )
    },
    { scope: revealRef, dependencies: [lng] },
  )

  return (
    <>
      <AppHeader
        title={
          <span className="brand-mark">
            <Icon name="leaf" size={22} className="brand-mark__leaf" />
            Ferma
          </span>
        }
        right={
          <>
            <LanguageSwitcher compact />
            <ThemeToggle />
          </>
        }
      />
      <Page entrance="none">
        <div ref={revealRef} style={{ display: 'contents' }}>
        {/* Repeat last order (scenario 4) */}
        {lastOrder && (
          <Section title={t('home:section.repeat')}>
            <div className="card repeat-card">
              <div className="repeat-card__icons" aria-hidden="true">
                {lastOrder.items.slice(0, 3).map((it, i) => (
                  <span key={i} className={'mini-thumb mini-thumb--' + (it.tone || 'brown')}>
                    <Icon name={it.icon} size={18} strokeWidth={1.8} />
                  </span>
                ))}
              </div>
              <div className="repeat-card__body">
                <strong>{money(lastOrder.total)}</strong>
                <span className="t-caption">
                  {lastOrder.items.map((it) => localizeEntity(it, lng).name).join(', ')}
                </span>
              </div>
              <Button size="sm" onClick={repeat}>
                {t('home:repeat.cta')}
              </Button>
            </div>
          </Section>
        )}

        {/* Categories */}
        <Section title={t('home:section.categories')}>
          <div className="home-cats">
            {categories.map((c) => (
              <CategoryChip
                key={c.id}
                icon={c.icon}
                onClick={() => navigate(`/catalog?cat=${c.id}`)}
              >
                {c.name}
              </CategoryChip>
            ))}
          </div>
        </Section>

        {/* Brand banner */}
        <div className="banner card">
          <div className="banner__text">
            <strong>{t('home:banner.title')}</strong>
            <span className="t-caption">{t('home:banner.subtitle')}</span>
          </div>
          <span className="banner__emoji" aria-hidden="true">
            <Icon name="leaf" size={34} strokeWidth={1.6} />
          </span>
        </div>

        {/* Popular */}
        <Section
          title={t('home:section.recommended')}
          action={
            <button className="section__action" onClick={() => navigate('/catalog')}>
              {t('common:button.viewAll')}
            </button>
          }
        >
          <div className="catalog-grid">
            {popular.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>

        {/* Farmer of the week */}
        <Section title={t('home:section.farmerOfWeek')}>
          {farmer && <FarmerCard farmer={farmer} />}
        </Section>
        </div>
      </Page>
    </>
  )
}
