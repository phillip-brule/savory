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
    description: 'Bandeja de 40 piezas para eventos.',
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
  { id: 'empanadita-pollo', name: 'Empanaditas de pollo' },
  { id: 'quipe-pollo', name: 'Quipes de pollo' },
  { id: 'quipe-res', name: 'Quipes de res' },
  { id: 'bolita-yuca', name: 'Bolitas de yuca y queso' },
  { id: 'bolita-queso', name: 'Bolitas de queso' },
  { id: 'croqueta-pollo', name: 'Croquetas de pollo' },
  { id: 'sandwichito', name: 'Sandwichitos' },
  { id: 'pizzita', name: 'Pizzitas' },
  { id: 'tortica-mermelada', name: 'Torticas con mermelada' },
]

/** Total piezas requeridas para empaque grupal */
export const GRUPAL_TOTAL_PIEZAS = 40

/** Cada clic en + agrega esta cantidad (grupal) */
export const GRUPAL_INCREMENTO = 5

/** Precio del empaque grupal de 40 piezas — null = cotizar */
export const grupalBoxPrice = 1000

export function cajitaLabel(pieces: number): string {
  return `Cajita de ${pieces} piezas`
}

export function empaqueTipoLabel(tipo: EmpaqueTipo): string {
  return tipo === 'carton' ? 'Cartón' : 'Plástico'
}
