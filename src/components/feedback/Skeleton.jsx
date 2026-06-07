// Generic shimmer block. The `.skeleton` class carries the CSS shimmer (globals.css),
// disabled under prefers-reduced-motion.
export function Skeleton({ width = '100%', height = 16, radius, style, className = '' }) {
  return (
    <span
      className={['skeleton', className].filter(Boolean).join(' ')}
      style={{ display: 'block', width, height, borderRadius: radius, ...style }}
      aria-hidden="true"
    />
  )
}

export function SkeletonProductCard() {
  return (
    <div className="card product-card" aria-hidden="true">
      <Skeleton height={120} radius="16px 16px 0 0" />
      <div className="product-card__body" style={{ display: 'grid', gap: 8 }}>
        <Skeleton width="80%" height={16} />
        <Skeleton width="40%" height={12} />
        <Skeleton width="60%" height={18} />
      </div>
    </div>
  )
}

// Grid of product skeletons for catalog/home loading states.
export function SkeletonGrid({ count = 4 }) {
  return (
    <div className="catalog-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  )
}
