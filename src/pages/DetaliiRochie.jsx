import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import FormularRezervare from '../components/FormularRezervare.jsx'
import StatusRochie from '../components/StatusRochie.jsx'
import { PAYPAL_ME, gasesteRochie } from '../data/rochii.js'
import { formatLei } from '../format.js'
import { stareRochie, useStatusuri } from '../statusuri.jsx'

export default function DetaliiRochie() {
  const { id } = useParams()
  const rochie = gasesteRochie(id)
  const { statusuri, incarcare, eroare } = useStatusuri()
  const [trimisa, setTrimisa] = useState(false)

  if (!rochie) {
    return <p>Rochia nu a fost găsită. <Link to="/">Înapoi la catalog</Link></p>
  }

  // PayPal.Me acceptă suma direct în link, de ex. paypal.me/nume/100RON
  const linkAvans = `${PAYPAL_ME}/${rochie.avans}RON`
  const stare = stareRochie(statusuri, rochie.id)

  let actiune
  if (trimisa) {
    actiune = (
      <div className="confirmare">
        <h2>Cererea a fost trimisă!</h2>
        <p>
          Rochia este acum în așteptare pentru tine. Plătește avansul pentru a confirma rezervarea –
          te vom contacta telefonic după ce îl primim.
        </p>
        <a className="buton-avans" href={linkAvans} target="_blank" rel="noopener noreferrer">
          Plătește avansul de {formatLei(rochie.avans)} cu PayPal
        </a>
        <p className="nota">
          Restul de {formatLei(rochie.pretInchiriere - rochie.avans)} se achită la ridicarea rochiei.
          Te rugăm să menționezi numele rochiei în nota plății.
        </p>
      </div>
    )
  } else if (incarcare) {
    actiune = <p className="nota">Se verifică disponibilitatea…</p>
  } else if (eroare) {
    actiune = <p className="nota">Nu am putut verifica disponibilitatea. Reîncarcă pagina sau contactează-ne.</p>
  } else if (stare === 'disponibila') {
    actiune = <FormularRezervare rochie={rochie} onTrimis={() => setTrimisa(true)} />
  } else if (stare === 'in_asteptare') {
    actiune = (
      <p className="nota">
        Această rochie are deja o cerere de rezervare în așteptare. Revino mai târziu sau contactează-ne.
      </p>
    )
  } else {
    actiune = (
      <p className="nota">
        Această rochie este momentan rezervată. Contactează-ne pentru a afla când devine disponibilă.
      </p>
    )
  }

  return (
    <article className="detalii">
      <Link to="/" className="inapoi">← Înapoi la catalog</Link>

      <div className="detalii-grila">
        <img src={rochie.imagine} alt={rochie.nume} />

        <div>
          <StatusRochie id={rochie.id} />
          <h1>{rochie.nume}</h1>
          <p>{rochie.descriere}</p>

          <dl className="caracteristici">
            <dt>Mărime</dt><dd>{rochie.marime}</dd>
            <dt>Culoare</dt><dd>{rochie.culoare}</dd>
            <dt>Material</dt><dd>{rochie.material}</dd>
            <dt>Preț închiriere</dt><dd>{formatLei(rochie.pretInchiriere)}</dd>
            <dt>Avans</dt><dd>{formatLei(rochie.avans)}</dd>
          </dl>

          {actiune}
        </div>
      </div>
    </article>
  )
}
