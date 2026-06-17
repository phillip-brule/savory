export type Modalidad = 'individual' | 'grupal'
export type EmpaqueTipo = 'carton' | 'plastico'

export interface CajitaSize {
  id: string
  pieces: number
  price: number
}

export interface Variedad {
  id: string
  name: string
  price: number
}

export const modalidadOptions: { id: Modalidad; label: string; description: string }[] = [
  {
    id: 'individual',
    label: 'Empaque individual',
    description: 'Cajita personal con variedades únicas.',
  },
  {
    id: 'grupal',
    label: 'Empaque grupal',
    description: 'Bandeja para eventos y reuniones. Incluye servilletas y cubiertos.',
  },
]

export const empaqueTipoOptions: { id: EmpaqueTipo; label: string }[] = [
  { id: 'carton', label: 'Cartón' },
  { id: 'plastico', label: 'Plástico' },
]

export const cajitaSizes: CajitaSize[] = [
  { id: 'cajita-3', pieces: 3, price: 90 },
  { id: 'cajita-4', pieces: 4, price: 115 },
  { id: 'cajita-5', pieces: 5, price: 140 },
  { id: 'cajita-6', pieces: 6, price: 165 },
]

export const variedades: Variedad[] = [
  { id: 'empanadita-pollo', name: 'Empanaditas de pollo', price: 25},
  { id: 'quipe-pollo', name: 'Quipes de pollo', price: 25},
  { id: 'quipe-res', name: 'Quipes de res', price: 25},
  { id: 'bolita-yuca', name: 'Bolitas de yuca', price: 25},
  { id: 'bolita-queso', name: 'Bolitas de queso', price: 30},
  { id: 'croqueta-pollo', name: 'Croquetas de pollo', price: 35},
  { id: 'sandwichito', name: 'Sandwichitos', price: 25},
  { id: 'pizzita', name: 'Pizzitas', price: 30},
  { id: 'tortica-mermelada', name: 'Torticas con mermelada', price: 30},
  { id: 'mini-wrap', name: 'Mini wraps de jamón y queso', price: 30},
  { id: 'empanada-dulce', name: 'Empanada dulce de guayaba', price: 25},
]

export const GRUPAL_MIN_PERSONAS = 2
export const GRUPAL_MAX_PERSONAS = 100

/** Total piezas requeridas para empaque grupal */
export const GRUPAL_MIN_PIEZAS = 20
export const GRUPAL_MAX_PIEZAS = 200


/** Cada clic en + agrega esta cantidad (grupal) */
export const GRUPAL_INCREMENTO = 5

/** Precio base del empaque grupal (cartón/bandeja) — se suma al costo de las piezas */
export const grupalBoxPrice = 125

export function calculatePiecesSubtotal(selections: Record<string, number>): number {
  return Object.entries(selections).reduce((sum, [id, count]) => {
    const v = variedades.find((x) => x.id === id)
    return sum + (v?.price ?? 0) * count
  }, 0)
}

export function calculateGrupalTotal(selections: Record<string, number>): number {
  return grupalBoxPrice + calculatePiecesSubtotal(selections)
}

export function cajitaLabel(pieces: number): string {
  return `Cajita de ${pieces} piezas`
}

export function empaqueTipoLabel(tipo: EmpaqueTipo): string {
  return tipo === 'carton' ? 'Cartón' : 'Plástico'
}
