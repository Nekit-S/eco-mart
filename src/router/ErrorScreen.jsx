import { useRouteError, useNavigate, isRouteErrorResponse } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button.jsx'

// Router errorElement — also catches unknown paths (404).
export default function ErrorScreen() {
  const error = useRouteError()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const is404 = isRouteErrorResponse(error) && error.status === 404

  return (
    <div className="app-shell">
      <main className="app-main" style={{ display: 'grid', placeItems: 'center' }}>
        <div className="empty">
          <div className="empty__emoji" aria-hidden="true">
            {is404 ? '🧭' : '⚠️'}
          </div>
          <h3 className="empty__title">
            {is404 ? 'Страница не найдена' : t('common:state.error.title')}
          </h3>
          <div className="empty__action">
            <Button onClick={() => navigate('/home')}>{t('nav:home')}</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
