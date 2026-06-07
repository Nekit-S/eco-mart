import { Link } from 'react-router-dom'
import Thumb from '../product/Thumb.jsx'

// Expects an ALREADY-LOCALIZED farmer (name/region/short are strings).
export default function FarmerCard({ farmer }) {
  return (
    <Link to={`/farmers/${farmer.id}`} className="farmer-card card">
      <Thumb emoji={farmer.emoji} tone={farmer.tone} shape="circle" ariaLabel={farmer.name} />
      <div className="farmer-card__body">
        <h3 className="farmer-card__name">{farmer.name}</h3>
        <p className="t-caption">📍 {farmer.region}</p>
        <p className="farmer-card__short">{farmer.short}</p>
      </div>
    </Link>
  )
}
