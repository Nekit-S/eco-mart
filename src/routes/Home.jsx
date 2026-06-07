import { useTranslation } from 'react-i18next'
import { useMoney } from '../hooks/useMoney.js'

// Temporary M0–M2 placeholder — replaced by the real HomeScreen in M6.
// Demonstrates i18n (t + language switch) + tenge formatting + the Kazakh-glyph
// smoke test (all 9 special letters must render with no tofu via Manrope Variable).
export default function Home() {
  const { t } = useTranslation()
  const money = useMoney()

  return (
    <section style={{ display: 'grid', gap: 16 }}>
      <h1 className="t-h1">{t('common:app.tagline')}</h1>
      <p className="t-body">{t('home:banner.subtitle')}</p>

      <div className="card" style={{ padding: 16, display: 'grid', gap: 8 }}>
        <h3 className="t-h3">Проверка казахских глифов</h3>
        <p lang="kk" style={{ fontSize: 22 }}>
          әғқңөұүһі ӘҒҚҢӨҰҮҺІ
        </p>
        <p className="t-caption" lang="kk">
          Фермадан дастарханыңызға — жергілікті фермерлік өнімдер
        </p>
      </div>

      <div className="card surface" style={{ padding: 16 }}>
        <p className="t-price" style={{ color: 'var(--c-brand)' }}>
          {money(1500)}
        </p>
        <p className="t-caption">Формат цены зависит от выбранного языка (KZT).</p>
      </div>
    </section>
  )
}
