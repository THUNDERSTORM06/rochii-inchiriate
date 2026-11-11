import { formatData } from '../format.js'

export default function StatusRochie({ rochie }) {
  if (!rochie.rezervata) return <span className="status disponibila">Disponibilă</span>

  return (
    <span className="status rezervata">
      Rezervată{rochie.rezervataPanaLa && ` până la ${formatData(rochie.rezervataPanaLa)}`}
    </span>
  )
}
