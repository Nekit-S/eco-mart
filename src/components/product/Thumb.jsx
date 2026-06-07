// Branded gradient tile with a centered emoji — our stand-in for product/farmer photos
// (no binary photo assets; fully offline-safe). `shape`: tile | circle | cover.
export default function Thumb({ emoji, tone = 'brown', shape = 'tile', size, className = '', ariaLabel }) {
  return (
    <div
      className={['thumb', `thumb--${tone}`, `thumb--${shape}`, className].filter(Boolean).join(' ')}
      style={size ? { width: size, height: size } : undefined}
      role="img"
      aria-label={ariaLabel}
    >
      <span className="thumb__emoji" aria-hidden="true">
        {emoji}
      </span>
    </div>
  )
}
