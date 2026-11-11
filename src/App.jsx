import { Suspense, lazy } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Catalog from './pages/Catalog.jsx'
import DetaliiRochie from './pages/DetaliiRochie.jsx'
import { StatusuriProvider } from './statusuri.jsx'

// Pagina de administrare (și autentificarea Firebase) se încarcă doar când e deschisă.
const Admin = lazy(() => import('./pages/hahaha.jsx'))

export default function App() {
  return (
    <StatusuriProvider>
      <header className="antet">
        <Link to="/" className="logo">Rochii de Închiriat</Link>
        <p className="slogan">Rochii elegante pentru fiecare ocazie</p>
      </header>

      <main className="continut">
        <Suspense fallback={<p>Se încarcă…</p>}>
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/rochie/:id" element={<DetaliiRochie />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<p>Pagina nu a fost găsită. <Link to="/">Înapoi la catalog</Link></p>} />
          </Routes>
        </Suspense>
      </main>

      <footer className="subsol">
        © {new Date().getFullYear()} Rochii de Închiriat · Pentru întrebări ne poți contacta la telefon sau e-mail.
      </footer>
    </StatusuriProvider>
  )
}
