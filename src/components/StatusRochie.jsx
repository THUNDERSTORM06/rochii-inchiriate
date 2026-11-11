import { formatData } from '../format.js'
import { useStatusuri } from '../statusuri.jsx'

export default function StatusRochie({ id }) {
  const { statusuri, incarcare, eroare } = useStatusuri()

  if (incarcare) return <span className="status">Se verifică…</span>
  if (eroare) return <span className="status">Disponibilitate necunoscută</span>

  const status = statusuri[id]
  if (!status) return <span className="status disponibila">Disponibilă</span>
  if (status.stare === 'in_asteptare') return <span className="status asteptare">În așteptare</span>

  return (
    <span className="status rezervata">
      Rezervată{status.panaLa && ` până la ${formatData(status.panaLa)}`}
    </span>
  )
}
