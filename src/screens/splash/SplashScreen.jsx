import { useTranslation } from 'react-i18next'
import Icon from '../../components/ui/Icon.jsx'

// Brand cover shown briefly on first launch (gated by RootBoot).
export default function SplashScreen() {
  const { t } = useTranslation()
  return (
    <div className="splash">
      <div className="splash__mark" aria-hidden="true">
        <Icon name="cup" size={72} strokeWidth={1.4} />
        <span className="splash__leaf">
          <Icon name="leaf" size={30} strokeWidth={1.6} />
        </span>
      </div>
      <h1 className="splash__name">{t('common:app.name')}</h1>
      <p className="splash__tagline">{t('common:app.tagline')}</p>
    </div>
  )
}
