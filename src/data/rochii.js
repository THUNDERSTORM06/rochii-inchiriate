// Catalogul de rochii. Pentru a marca o rochie ca rezervată, setează `rezervata: true`
// (opțional, completează și `rezervataPanaLa` cu data în format AAAA-LL-ZZ).

// Link PayPal.Me – înlocuiește NUMELE_TAU cu numele tău de utilizator PayPal.
export const PAYPAL_ME = 'https://www.paypal.me/NUMELE_TAU'

export const rochii = [
  {
    id: 'rochie-seara-bordo',
    nume: 'Rochie de seară bordo',
    descriere:
      'Rochie lungă din satin, cu decolteu în V și spate deschis. Perfectă pentru gale, nunți sau baluri.',
    marime: 'S',
    culoare: 'Bordo',
    material: 'Satin',
    pretInchiriere: 250,
    avans: 100,
    imagine: 'imagini/rochie-1.svg',
    rezervata: false,
  },
  {
    id: 'rochie-cocktail-bleumarin',
    nume: 'Rochie cocktail bleumarin',
    descriere:
      'Rochie midi elegantă, cu mâneci din dantelă. Potrivită pentru botezuri, cununii civile și evenimente de seară.',
    marime: 'M',
    culoare: 'Bleumarin',
    material: 'Crep și dantelă',
    pretInchiriere: 180,
    avans: 70,
    imagine: 'imagini/rochie-2.svg',
    rezervata: true,
    rezervataPanaLa: '2026-11-30',
  },
  {
    id: 'rochie-mireasa-ivoire',
    nume: 'Rochie de mireasă ivoire',
    descriere:
      'Rochie de mireasă tip A-line, cu corset brodat manual și trenă scurtă din tul.',
    marime: 'M',
    culoare: 'Ivoire',
    material: 'Tul și dantelă',
    pretInchiriere: 900,
    avans: 300,
    imagine: 'imagini/rochie-3.svg',
    rezervata: false,
  },
  {
    id: 'rochie-verde-smarald',
    nume: 'Rochie verde smarald',
    descriere:
      'Rochie lungă din catifea, cu crăpătură laterală. Ideală pentru evenimentele de iarnă.',
    marime: 'L',
    culoare: 'Verde smarald',
    material: 'Catifea',
    pretInchiriere: 220,
    avans: 80,
    imagine: 'imagini/rochie-4.svg',
    rezervata: false,
  },
  {
    id: 'rochie-lavanda-domnisoara-onoare',
    nume: 'Rochie lavandă domnișoară de onoare',
    descriere:
      'Rochie vaporoasă din șifon, cu talie înaltă. Ușoară și comodă pentru o zi întreagă de nuntă.',
    marime: 'XS',
    culoare: 'Lavandă',
    material: 'Șifon',
    pretInchiriere: 150,
    avans: 50,
    imagine: 'imagini/rochie-5.svg',
    rezervata: true,
    rezervataPanaLa: '2026-12-15',
  },
  {
    id: 'rochie-rosie-paiete',
    nume: 'Rochie roșie cu paiete',
    descriere:
      'Rochie scurtă cu paiete, cu umeri goi. Pentru petreceri de Revelion și evenimente festive.',
    marime: 'S',
    culoare: 'Roșu',
    material: 'Paiete',
    pretInchiriere: 200,
    avans: 80,
    imagine: 'imagini/rochie-6.svg',
    rezervata: false,
  },
]

export function gasesteRochie(id) {
  return rochii.find((r) => r.id === id)
}
