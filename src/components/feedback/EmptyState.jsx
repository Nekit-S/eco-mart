import Icon from '../ui/Icon.jsx'

// Friendly empty state (diploma §3.1). icon (line) + title + optional subtitle + action.
export default function EmptyState({ icon = 'leaf', title, subtitle, action }) {
  return (
    <div className="empty">
      <div className="empty__icon" aria-hidden="true">
        <Icon name={icon} size={36} strokeWidth={1.6} />
      </div>
      {title && <h3 className="empty__title">{title}</h3>}
      {subtitle && <p className="t-caption empty__sub">{subtitle}</p>}
      {action && <div className="empty__action">{action}</div>}
    </div>
  )
}
