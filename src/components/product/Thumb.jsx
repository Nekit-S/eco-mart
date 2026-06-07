import Icon from '../ui/Icon.jsx'

// Branded gradient tile with a centered line icon — our stand-in for product/farmer
// photos (no binary assets; fully offline-safe). `shape`: tile | circle | cover.
export default function Thumb({ icon, tone = 'brown', shape = 'tile', size, className = '', ariaLabel }) {
  return (
    <div
      className={['thumb', `thumb--${tone}`, `thumb--${shape}`, className].filter(Boolean).join(' ')}
      style={size ? { width: size, height: size } : undefined}
      role="img"
      aria-label={ariaLabel}
    >
      <Icon name={icon} className="thumb__icon" strokeWidth={1.4} />
    </div>
  )
}
