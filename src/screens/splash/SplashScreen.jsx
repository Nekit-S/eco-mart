import { useTranslation } from 'react-i18next'

// Brand cover shown briefly on first launch (gated by RootBoot).
export default function SplashScreen() {
  const { t } = useTranslation()
  return (
    <div className="splash">
      <div className="splash__mark" aria-hidden="true">
        <span className="splash__pin">📍</span>
        <span className="splash__bean">🌱</span>
      </div>
      <h1 className="splash__name">{t('common:app.name')}</h1>
      <p className="splash__tagline">{t('common:app.tagline')}</p>
    </div>
  )
}
