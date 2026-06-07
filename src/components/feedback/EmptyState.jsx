// Friendly empty state (diploma §3.1). emoji + title + optional subtitle + optional action.
export default function EmptyState({ emoji = '🌿', title, subtitle, action }) {
  return (
    <div className="empty">
      <div className="empty__emoji" aria-hidden="true">
        {emoji}
      </div>
      {title && <h3 className="empty__title">{title}</h3>}
      {subtitle && <p className="t-caption empty__sub">{subtitle}</p>}
      {action && <div className="empty__action">{action}</div>}
    </div>
  )
}
