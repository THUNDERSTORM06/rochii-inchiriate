import { useState } from 'react'
import CardRochie from '../components/CardRochie.jsx'
import { rochii } from '../data/rochii.js'
import { stareRochie, useStatusuri } from '../statusuri.jsx'

const filtre = {
  toate: { eticheta: 'Toate', test: () => true },
  disponibile: { eticheta: 'Disponibile', test: (stare) => stare === 'disponibila' },
  rezervate: { eticheta: 'Rezervate', test: (stare) => stare !== 'disponibila' },
}

export default function Catalog() {
  const [filtru, setFiltru] = useState('toate')
  const { statusuri } = useStatusuri()
  const vizibile = rochii.filter((r) => filtre[filtru].test(stareRochie(statusuri, r.id)))

  return (
    <>
      <div className="bara-filtre">
        <h1>Catalog</h1>
        <div className="filtre">
          {Object.entries(filtre).map(([cheie, { eticheta }]) => (
            <button
              key={cheie}
              className={cheie === filtru ? 'activ' : ''}
              onClick={() => setFiltru(cheie)}
            >
              {eticheta}
            </button>
          ))}
        </div>
      </div>

      {vizibile.length === 0 ? (
        <p>Nu există rochii în această categorie.</p>
      ) : (
        <div className="grila">
          {vizibile.map((rochie) => (
            <CardRochie key={rochie.id} rochie={rochie} />
          ))}
        </div>
      )}
    </>
  )
}
