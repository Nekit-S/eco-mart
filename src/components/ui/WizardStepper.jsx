import Icon from './Icon.jsx'

// Compact 4-step indicator for checkout. steps = [{ key, label }]; currentIndex 0-based.
export default function WizardStepper({ steps, currentIndex }) {
  return (
    <ol className="stepper" aria-label="Шаги оформления">
      {steps.map((s, i) => {
        const state = i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'todo'
        return (
          <li key={s.key} className={'stepper__item stepper__item--' + state}>
            <span className="stepper__dot" aria-hidden="true">
              {i < currentIndex ? <Icon name="check" size={14} strokeWidth={2.6} /> : i + 1}
            </span>
            <span className="stepper__label">{s.label}</span>
            {i < steps.length - 1 && <span className="stepper__line" aria-hidden="true" />}
          </li>
        )
      })}
    </ol>
  )
}
