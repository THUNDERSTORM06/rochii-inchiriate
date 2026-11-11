import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, doc, onSnapshot, setDoc, updateDoc, writeBatch } from 'firebase/firestore'
import { app, db } from '../firebase.js'
import { rochii } from '../data/rochii.js'
import { formatData } from '../format.js'
import { stareRochie, useStatusuri } from '../statusuri.jsx'

const auth = getAuth(app)

export default function Admin() {
  // undefined = încă nu știm, null = neautentificat
  const [utilizator, setUtilizator] = useState(undefined)
  useEffect(() => onAuthStateChanged(auth, setUtilizator), [])

  if (utilizator === undefined) return <p>Se încarcă…</p>
  if (!utilizator) return <Autentificare />
  return <Panou />
}

function Autentificare() {
  const [eroare, setEroare] = useState('')

  async function conectare(e) {
    e.preventDefault()
    const date = new FormData(e.currentTarget)
    setEroare('')
    try {
      await signInWithEmailAndPassword(auth, date.get('email'), date.get('parola'))
    } catch {
      setEroare('Email sau parolă greșită.')
    }
  }

  return (
    <form className="formular formular-admin" onSubmit={conectare}>
      <h1>Administrare</h1>
      <label>
        Email
        <input name="email" type="email" required autoComplete="username" />
      </label>
      <label>
        Parolă
        <input name="parola" type="password" required autoComplete="current-password" />
      </label>
      {eroare && <p className="eroare">{eroare}</p>}
      <button className="buton">Conectare</button>
    </form>
  )
}

function Panou() {
  const { statusuri } = useStatusuri()
  const [cereri, setCereri] = useState({})
  const [eroare, setEroare] = useState('')

  useEffect(
    () =>
      onSnapshot(
        collection(db, 'cereri'),
        (snap) => {
          const toate = {}
          snap.forEach((d) => { toate[d.id] = d.data() })
          setCereri(toate)
        },
        () => setEroare('Acest cont nu are drept de administrator.'),
      ),
    [],
  )

  async function executa(actiune) {
    try {
      await actiune()
    } catch {
      alert('Operațiunea nu a reușit. Încearcă din nou.')
    }
  }

  const confirma = (id) =>
    executa(() =>
      updateDoc(doc(db, 'status', id), { stare: 'rezervata', panaLa: cereri[id]?.dataEveniment ?? null }),
    )

  const marcheazaRezervata = (id) => executa(() => setDoc(doc(db, 'status', id), { stare: 'rezervata' }))

  const elibereaza = (rochie) => {
    if (!confirm(`Eliberezi „${rochie.nume}”? Cererea de rezervare va fi ștearsă.`)) return
    executa(async () => {
      const batch = writeBatch(db)
      batch.delete(doc(db, 'status', rochie.id))
      batch.delete(doc(db, 'cereri', rochie.id))
      await batch.commit()
    })
  }

  return (
    <>
      <div className="bara-filtre">
        <h1>Administrare</h1>
        <button className="buton-secundar" onClick={() => signOut(auth)}>Deconectare</button>
      </div>

      {eroare && <p className="eroare">{eroare}</p>}

      <div className="lista-admin">
        {rochii.map((rochie) => {
          const stare = stareRochie(statusuri, rochie.id)
          const cerere = cereri[rochie.id]
          const panaLa = statusuri[rochie.id]?.panaLa

          return (
            <div key={rochie.id} className={`rand-admin ${stare}`}>
              <div>
                <strong>{rochie.nume}</strong>
                <div className="nota">
                  {stare === 'disponibila' && 'Disponibilă'}
                  {stare === 'in_asteptare' && 'În așteptare – verifică dacă a sosit avansul'}
                  {stare === 'rezervata' && `Rezervată${panaLa ? ` până la ${formatData(panaLa)}` : ''}`}
                </div>
                {cerere && (
                  <div className="cerere">
                    {cerere.nume} · <a href={`tel:${cerere.telefon}`}>{cerere.telefon}</a> · eveniment:{' '}
                    {formatData(cerere.dataEveniment)}
                  </div>
                )}
              </div>

              <div className="butoane-admin">
                {stare === 'in_asteptare' && (
                  <button className="buton" onClick={() => confirma(rochie.id)}>Confirmă (avans primit)</button>
                )}
                {stare === 'disponibila' && (
                  <button className="buton-secundar" onClick={() => marcheazaRezervata(rochie.id)}>
                    Marchează rezervată
                  </button>
                )}
                {stare !== 'disponibila' && (
                  <button className="buton-secundar" onClick={() => elibereaza(rochie)}>
                    {stare === 'in_asteptare' ? 'Anulează' : 'Eliberează'}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
