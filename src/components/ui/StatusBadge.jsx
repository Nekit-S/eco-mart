import { useTranslation } from 'react-i18next'
import Badge from './Badge.jsx'
import { ORDER_STATUS } from '../../utils/constants.js'

const TONE = {
  [ORDER_STATUS.CREATED]: 'neutral',
  [ORDER_STATUS.ACCEPTED]: 'brand',
  [ORDER_STATUS.PREPARING]: 'warning',
  [ORDER_STATUS.READY]: 'accent',
  [ORDER_STATUS.DELIVERING]: 'brand',
  [ORDER_STATUS.COMPLETED]: 'success',
  [ORDER_STATUS.CANCELLED]: 'error',
}

export default function StatusBadge({ status }) {
  const { t } = useTranslation()
  return <Badge tone={TONE[status] || 'neutral'}>{t(`order:status.${status}`)}</Badge>
}
