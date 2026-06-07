import { useMoney } from '../../hooks/useMoney.js'

export default function PriceTag({ amount, className = '' }) {
  const money = useMoney()
  return <span className={['t-price', className].filter(Boolean).join(' ')}>{money(amount)}</span>
}
