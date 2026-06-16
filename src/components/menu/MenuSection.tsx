import { useState } from 'react'
import { menuCategories, menuItems, type MenuCategory } from '../../data/menu'
import { MenuCard } from './MenuCard'

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('picaderas')

  const filtered = menuItems.filter((item) => item.category === activeCategory)
  const categoryMeta = menuCategories.find((c) => c.id === activeCategory)

  return (
    <section id="menu" className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-green">
            Nuestro menú
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold text-brown sm:text-5xl">
            Variedades de picaderas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-brown/70">
            Bocados crujientes y llenos de sabor, preparados para compartir en cualquier ocasión.
          </p>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-6 py-2.5 font-display text-sm font-semibold transition ${
                activeCategory === cat.id
                  ? 'bg-brown text-cream'
                  : 'bg-cream-dark text-brown hover:bg-brown/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {categoryMeta && (
          <p className="mt-6 text-center text-sm text-brown/60">{categoryMeta.description}</p>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
