export default function CategoryChip({ active = false, emoji, children, ...rest }) {
  return (
    <button
      type="button"
      className={'chip' + (active ? ' chip--active' : '')}
      aria-pressed={active}
      {...rest}
    >
      {emoji && <span className="chip__emoji" aria-hidden="true">{emoji}</span>}
      <span>{children}</span>
    </button>
  )
}
