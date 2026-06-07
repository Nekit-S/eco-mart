import { useTranslation } from 'react-i18next'

// Quantity stepper. At min, the "−" turns into a remove affordance if onRemove given.
export default function QtyStepper({ value, onInc, onDec, min = 1, size = 'md' }) {
  const { t } = useTranslation()
  return (
    <div className={'qty qty--' + size} role="group" aria-label={t('common:label.weight')}>
      <button
        type="button"
        className="qty__btn"
        onClick={onDec}
        aria-label="−"
        disabled={value <= min && min > 0 ? false : undefined}
      >
        −
      </button>
      <span className="qty__val" aria-live="polite">
        {value}
      </span>
      <button type="button" className="qty__btn" onClick={onInc} aria-label="+">
        +
      </button>
    </div>
  )
}
