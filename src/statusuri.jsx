import { createContext, useContext, useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from './firebase.js'

// Colecția `status` are câte un document pentru fiecare rochie care nu e liberă:
// { stare: 'in_asteptare' | 'rezervata', panaLa?: 'AAAA-LL-ZZ' }
const StatusuriContext = createContext({ statusuri: {}, incarcare: true, eroare: null })

export function StatusuriProvider({ children }) {
  const [valoare, setValoare] = useState({ statusuri: {}, incarcare: true, eroare: null })

  useEffect(
    () =>
      onSnapshot(
        collection(db, 'status'),
        (snap) => {
          const statusuri = {}
          snap.forEach((d) => { statusuri[d.id] = d.data() })
          setValoare({ statusuri, incarcare: false, eroare: null })
        },
        (eroare) => setValoare((v) => ({ ...v, incarcare: false, eroare })),
      ),
    [],
  )

  return <StatusuriContext.Provider value={valoare}>{children}</StatusuriContext.Provider>
}

export const useStatusuri = () => useContext(StatusuriContext)

// 'disponibila' | 'in_asteptare' | 'rezervata'
export const stareRochie = (statusuri, id) => statusuri[id]?.stare ?? 'disponibila'
