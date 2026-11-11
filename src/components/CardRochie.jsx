import { Link } from 'react-router-dom'
import StatusRochie from './StatusRochie.jsx'
import { formatLei } from '../format.js'

export default function CardRochie({ rochie }) {
  return (
    <Link to={`/rochie/${rochie.id}`} className="card">
      <img src={rochie.imagine} alt={rochie.nume} loading="lazy" />
      <div className="card-info">
        <StatusRochie rochie={rochie} />
        <h2>{rochie.nume}</h2>
        <p className="detalii-scurte">Mărimea {rochie.marime} · {rochie.culoare}</p>
        <p className="pret">{formatLei(rochie.pretInchiriere)} <small>/ închiriere</small></p>
      </div>
    </Link>
  )
}
