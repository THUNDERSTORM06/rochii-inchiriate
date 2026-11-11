import { Link, Route, Routes } from 'react-router-dom'
import Catalog from './pages/Catalog.jsx'
import DetaliiRochie from './pages/DetaliiRochie.jsx'

export default function App() {
  return (
    <>
      <header className="antet">
        <Link to="/" className="logo">Rochii de Închiriat</Link>
        <p className="slogan">Rochii elegante pentru fiecare ocazie</p>
      </header>

      <main className="continut">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/rochie/:id" element={<DetaliiRochie />} />
          <Route path="*" element={<p>Pagina nu a fost găsită. <Link to="/">Înapoi la catalog</Link></p>} />
        </Routes>
      </main>

      <footer className="subsol">
        © {new Date().getFullYear()} Rochii de Închiriat · Pentru întrebări ne poți contacta la telefon sau e-mail.
      </footer>
    </>
  )
}
