const lei = new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'RON', maximumFractionDigits: 0 })
const data = new Intl.DateTimeFormat('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })

export const formatLei = (suma) => lei.format(suma)
export const formatData = (text) => data.format(new Date(text))
