import { useState } from 'react'
import CardRochie from '../components/CardRochie.jsx'
import { rochii } from '../data/rochii.js'

const filtre = {
  toate: { eticheta: 'Toate', test: () => true },
  disponibile: { eticheta: 'Disponibile', test: (r) => !r.rezervata },
  rezervate: { eticheta: 'Rezervate', test: (r) => r.rezervata },
}

export default function Catalog() {
  const [filtru, setFiltru] = useState('toate')
  const vizibile = rochii.filter(filtre[filtru].test)

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
