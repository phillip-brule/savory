export type MenuCategory = 'picaderas' | 'empaques'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number | null
  category: MenuCategory
  image?: string
}

export const menuCategories: { id: MenuCategory; label: string; description: string }[] = [
  {
    id: 'picaderas',
    label: 'Picaderas',
    description: 'Precio por unidad. Elige tus productos abajo y añádelos a tu lista de pedido.',
  },
  {
    id: 'empaques',
    label: 'Empaques',
    description: 'Presentaciones individuales o grupales para tus eventos.',
  },
]

export const menuItems: MenuItem[] = [
  {
    id: 'empanadita-pollo',
    name: 'Empanadita de pollo',
    description: 'Empanadita crujiente rellena de pollo, perfecta para picar.',
    price: 25,
    category: 'picaderas',
  },
  {
    id: 'quipe',
    name: 'Quipe de pollo o res',
    description: 'Clásico quipe dorado con relleno de pollo o res.',
    price: 25,
    category: 'picaderas',
  },
  {
    id: 'croqueta-pollo',
    name: 'Croqueta de pollo',
    description: 'Croqueta cremosa por dentro y crujiente por fuera.',
    price: 35,
    category: 'picaderas',
  },
  {
    id: 'sandwichito',
    name: 'Sandwichito',
    description: 'Mini sándwich suave, ideal para reuniones y fiestas.',
    price: 25,
    category: 'picaderas',
  },
  {
    id: 'bolita-yuca',
    name: 'Bolita de yuca',
    description: 'Bocado de yuca frita, dorado y ligero.',
    price: 25,
    category: 'picaderas',
  },
  {
    id: 'bolita-queso',
    name: 'Bolita de queso',
    description: 'Bolita de queso frita, irresistible y fundente.',
    price: 30,
    category: 'picaderas',
  },
  {
    id: 'mini-wrap',
    name: 'Mini wrap de jamón y queso',
    description: 'Wrap enrollado con jamón y queso, porción individual.',
    price: 30,
    category: 'picaderas',
  },
  {
    id: 'pizzita',
    name: 'Pizzita',
    description: 'Mini pizza con el sabor que todos disfrutan.',
    price: 30,
    category: 'picaderas',
  },
  {
    id: 'empanadilla-guayaba',
    name: 'Empanadilla dulce de guayaba',
    description: 'Toque dulce con relleno de guayaba artesanal.',
    price: 25,
    category: 'picaderas',
  },
  {
    id: 'empaque-grupal',
    name: 'Empaque grupal',
    description:
      'Bandeja o caja grande con variedad de picaderas. Ideal para fiestas, oficinas y celebraciones.',
    price: null,
    category: 'empaques',
    image: '/images/empaque_grupal.png',
  },
  {
    id: 'empaque-individual',
    name: 'Empaque individual',
    description:
      'Caja personal con selección de 3–4 picaderas. Perfecto para regalar o servir por persona.',
    price: null,
    category: 'empaques',
    image: '/images/empaque_individual.png',
  },
]
