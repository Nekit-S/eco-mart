import Icon from './Icon.jsx'

// Quantity stepper.
export default function QtyStepper({ value, onInc, onDec, min = 1, size = 'md' }) {
  return (
    <div className={'qty qty--' + size} role="group" aria-label="Количество">
      <button type="button" className="qty__btn" onClick={onDec} aria-label="−">
        <Icon name="minus" size={18} strokeWidth={2.2} />
      </button>
      <span className="qty__val" aria-live="polite">
        {value}
      </span>
      <button type="button" className="qty__btn" onClick={onInc} aria-label="+">
        <Icon name="plus" size={18} strokeWidth={2.2} />
      </button>
    </div>
  )
}
