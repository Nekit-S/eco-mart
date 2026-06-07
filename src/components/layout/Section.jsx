// Titled content section with an optional trailing action (e.g. "See all").
export default function Section({ title, action, className = '', children }) {
  return (
    <section className={['section', className].filter(Boolean).join(' ')}>
      {(title || action) && (
        <div className="section__head">
          {title && <h2 className="section__title t-h3">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  )
}
