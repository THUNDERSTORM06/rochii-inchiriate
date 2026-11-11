import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Configurația proiectului Firebase (Project settings → Your apps → aplicația Web).
// Aceste valori sunt publice; datele sunt protejate de regulile din firestore.rules.
const config = {
  apiKey: 'AIzaSyCYGRltpMvSwk_0obRfINgFuW49VrAiGOM',
  authDomain: 'rochii-inchiriate.firebaseapp.com',
  projectId: 'rochii-inchiriate',
  appId: '1:86694316752:web:3278438898f457f68eecd5',
}

export const app = initializeApp(config)
export const db = getFirestore(app)
