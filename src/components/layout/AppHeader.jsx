import { useNavigate } from 'react-router-dom'

// Global header. `back` shows a back chevron (uses router history); `right` is an
// actions slot. Used by PlainLayout (with back) and TabLayout (title + actions).
export default function AppHeader({ title, back = false, right = null, onBack }) {
  const navigate = useNavigate()
  const handleBack = () => (onBack ? onBack() : navigate(-1))
  return (
    <header className="app-header">
      <div className="app-header__left">
        {back && (
          <button type="button" className="app-header__back tap" aria-label="Назад" onClick={handleBack}>
            ‹
          </button>
        )}
        {title && <h1 className="app-header__title">{title}</h1>}
      </div>
      {right && <div className="app-header__right">{right}</div>}
    </header>
  )
}
