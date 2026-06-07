import { Link } from 'react-router-dom'
import Thumb from '../product/Thumb.jsx'
import Icon from '../ui/Icon.jsx'

// Expects an ALREADY-LOCALIZED farmer (name/region/short are strings).
export default function FarmerCard({ farmer }) {
  return (
    <Link to={`/farmers/${farmer.id}`} className="farmer-card card">
      <Thumb icon={farmer.icon} tone={farmer.tone} shape="circle" ariaLabel={farmer.name} />
      <div className="farmer-card__body">
        <h3 className="farmer-card__name">{farmer.name}</h3>
        <p className="t-caption region-line">
          <Icon name="pin" size={14} strokeWidth={2} /> {farmer.region}
        </p>
        <p className="farmer-card__short">{farmer.short}</p>
      </div>
    </Link>
  )
}
