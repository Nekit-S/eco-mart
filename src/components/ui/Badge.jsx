// tone: neutral | brand | accent | success | error | warning
export default function Badge({ tone = 'neutral', className = '', children }) {
  return (
    <span className={['badge', `badge--${tone}`, className].filter(Boolean).join(' ')}>
      {children}
    </span>
  )
}
