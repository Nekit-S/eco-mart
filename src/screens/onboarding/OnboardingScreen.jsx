import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { useUiStore } from '../../store/useUiStore.js'

const SLIDES = [
  { key: 'slide1', icon: 'basket' },
  { key: 'slide2', icon: 'sprout' },
  { key: 'slide3', icon: 'spark' },
]

export default function OnboardingScreen() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setOnboardingSeen = useUiStore((s) => s.setOnboardingSeen)
  const [index, setIndex] = useState(0)
  const isLast = index === SLIDES.length - 1
  const slide = SLIDES[index]

  const finish = () => {
    setOnboardingSeen(true)
    navigate('/language', { replace: true })
  }

  return (
    <div className="onboarding">
      <button type="button" className="onboarding__skip" onClick={finish}>
        {t('common:button.skip')}
      </button>

      <div className="onboarding__art" aria-hidden="true">
        <Icon name={slide.icon} size={104} strokeWidth={1.3} />
      </div>
      <div className="onboarding__copy">
        <h1 className="t-h1">{t(`onboarding:${slide.key}.title`)}</h1>
        <p className="t-body t-muted">{t(`onboarding:${slide.key}.text`)}</p>
      </div>

      <div className="onboarding__dots" role="tablist" aria-label="Слайды">
        {SLIDES.map((s, i) => (
          <span key={s.key} className={'dot' + (i === index ? ' dot--active' : '')} />
        ))}
      </div>

      <Button fullWidth size="lg" onClick={() => (isLast ? finish() : setIndex(index + 1))}>
        {isLast ? t('common:button.start') : t('common:button.next')}
      </Button>
    </div>
  )
}
