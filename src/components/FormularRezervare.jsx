import { useState } from 'react'
import { doc, serverTimestamp, writeBatch } from 'firebase/firestore'
import { db } from '../firebase.js'

// Data de azi în format AAAA-LL-ZZ, după ora locală
const azi = () => new Date().toLocaleDateString('sv-SE')

export default function FormularRezervare({ rochie, onTrimis }) {
  const [trimitere, setTrimitere] = useState(false)
  const [eroare, setEroare] = useState('')

  async function trimite(e) {
    e.preventDefault()
    const date = new FormData(e.currentTarget)
    setTrimitere(true)
    setEroare('')

    // Starea (publică) și datele de contact (private) se scriu împreună.
    // Regulile Firestore resping cererea dacă rochia are deja o rezervare.
    const batch = writeBatch(db)
    batch.set(doc(db, 'status', rochie.id), { stare: 'in_asteptare', creatLa: serverTimestamp() })
    batch.set(doc(db, 'cereri', rochie.id), {
      nume: date.get('nume').trim(),
      telefon: date.get('telefon').trim(),
      dataEveniment: date.get('dataEveniment'),
      creatLa: serverTimestamp(),
    })

    try {
      await batch.commit()
      onTrimis()
    } catch (err) {
      setEroare(
        err.code === 'permission-denied'
          ? 'Ne pare rău, rochia tocmai a fost rezervată de altcineva.'
          : 'Cererea nu a putut fi trimisă. Încearcă din nou.',
      )
      setTrimitere(false)
    }
  }

  return (
    <form className="formular" onSubmit={trimite}>
      <h2>Rezervă această rochie</h2>
      <label>
        Nume și prenume
        <input name="nume" required minLength={2} maxLength={100} autoComplete="name" />
      </label>
      <label>
        Telefon
        <input name="telefon" type="tel" required minLength={6} maxLength={20} autoComplete="tel" />
      </label>
      <label>
        Data evenimentului
        <input name="dataEveniment" type="date" required min={azi()} />
      </label>
      {eroare && <p className="eroare">{eroare}</p>}
      <button className="buton" disabled={trimitere}>
        {trimitere ? 'Se trimite…' : 'Trimite cererea de rezervare'}
      </button>
    </form>
  )
}
