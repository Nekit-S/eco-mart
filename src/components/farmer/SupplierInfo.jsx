import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Thumb from '../product/Thumb.jsx'
import Icon from '../ui/Icon.jsx'

// Compact supplier strip shown on the product detail screen — taps through to the
// farmer page (diploma scenario 2: product -> read supplier). Expects localized farmer.
export default function SupplierInfo({ farmer }) {
  const { t } = useTranslation()
  if (!farmer) return null
  return (
    <Link to={`/farmers/${farmer.id}`} className="supplier card">
      <Thumb icon={farmer.icon} tone={farmer.tone} shape="circle" size={48} ariaLabel={farmer.name} />
      <div className="supplier__body">
        <span className="t-caption">{t('common:label.supplier')}</span>
        <strong className="supplier__name">{farmer.name}</strong>
        <span className="t-caption region-line">
          <Icon name="pin" size={14} strokeWidth={2} /> {farmer.region}
        </span>
      </div>
      <Icon name="chevronRight" size={22} className="supplier__chev" />
    </Link>
  )
}
