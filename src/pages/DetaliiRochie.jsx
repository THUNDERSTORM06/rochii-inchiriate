import { Link, useParams } from 'react-router-dom'
import StatusRochie from '../components/StatusRochie.jsx'
import { PAYPAL_ME, gasesteRochie } from '../data/rochii.js'
import { formatLei } from '../format.js'

export default function DetaliiRochie() {
  const { id } = useParams()
  const rochie = gasesteRochie(id)

  if (!rochie) {
    return <p>Rochia nu a fost găsită. <Link to="/">Înapoi la catalog</Link></p>
  }

  // PayPal.Me acceptă suma direct în link, de ex. paypal.me/nume/100RON
  const linkAvans = `${PAYPAL_ME}/${rochie.avans}RON`

  return (
    <article className="detalii">
      <Link to="/" className="inapoi">← Înapoi la catalog</Link>

      <div className="detalii-grila">
        <img src={rochie.imagine} alt={rochie.nume} />

        <div>
          <StatusRochie rochie={rochie} />
          <h1>{rochie.nume}</h1>
          <p>{rochie.descriere}</p>

          <dl className="caracteristici">
            <dt>Mărime</dt><dd>{rochie.marime}</dd>
            <dt>Culoare</dt><dd>{rochie.culoare}</dd>
            <dt>Material</dt><dd>{rochie.material}</dd>
            <dt>Preț închiriere</dt><dd>{formatLei(rochie.pretInchiriere)}</dd>
            <dt>Avans</dt><dd>{formatLei(rochie.avans)}</dd>
          </dl>

          {rochie.rezervata ? (
            <p className="nota">
              Această rochie este momentan rezervată. Contactează-ne pentru a afla când devine disponibilă.
            </p>
          ) : (
            <>
              <a className="buton-avans" href={linkAvans} target="_blank" rel="noopener noreferrer">
                Plătește avansul de {formatLei(rochie.avans)} cu PayPal
              </a>
              <p className="nota">
                Avansul rezervă rochia pentru tine. Restul de{' '}
                {formatLei(rochie.pretInchiriere - rochie.avans)} se achită la ridicarea rochiei.
                Te rugăm să menționezi numele rochiei în nota plății.
              </p>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
