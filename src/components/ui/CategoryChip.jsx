import Icon from './Icon.jsx'

export default function CategoryChip({ active = false, icon, children, ...rest }) {
  return (
    <button
      type="button"
      className={'chip' + (active ? ' chip--active' : '')}
      aria-pressed={active}
      {...rest}
    >
      {icon && <Icon name={icon} size={18} strokeWidth={2} className="chip__icon" />}
      <span>{children}</span>
    </button>
  )
}
