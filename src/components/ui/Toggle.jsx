// Accessible switch. Pass label for the visible text; control state via checked/onChange.
export default function Toggle({ checked, onChange, label, id }) {
  return (
    <label className="toggle" htmlFor={id}>
      {label && <span className="toggle__label">{label}</span>}
      <span className="toggle__switch">
        <input
          id={id}
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className="toggle__track" aria-hidden="true">
          <span className="toggle__thumb" />
        </span>
      </span>
    </label>
  )
}
