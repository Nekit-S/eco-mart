import { useTranslation } from 'react-i18next'
import Button from '../ui/Button.jsx'

export default function ErrorState({ message, onRetry }) {
  const { t } = useTranslation()
  return (
    <div className="empty">
      <div className="empty__emoji" aria-hidden="true">
        ⚠️
      </div>
      <h3 className="empty__title">{t('common:state.error.title')}</h3>
      <p className="t-caption empty__sub">{message || t('common:state.error.network')}</p>
      {onRetry && (
        <div className="empty__action">
          <Button variant="secondary" onClick={onRetry}>
            {t('common:button.retry')}
          </Button>
        </div>
      )}
    </div>
  )
}
