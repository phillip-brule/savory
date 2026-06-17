import { useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../../data/site'

const gallery = [
  {
    src: '/images/local.jpg',
    alt: 'Fachada de Savory Sips & Bites',
  },
  {
    src: '/images/picaderas.jpg',
    alt: 'Bandeja de picaderas Savory',
  },
  {
    src: '/images/gal_1.jpg',
    alt: 'Cliente disfrutando picaderas de Savory',
  },
  {
    src: '/images/gal_2.jpg',
    alt: 'Empaque grupal de picaderas para eventos',
  },
]

export function AboutSection() {
  const [selected, setSelected] = useState(0)
  const active = gallery[selected]

  return (
    <section id="nosotros" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <motion.img
                key={active.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={active.src}
                alt={active.alt}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

          </motion.div>
        
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-green">
              Nosotros
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold text-brown">
              Savory Sips & Bites
            </h2>
            <p className="mt-4 text-brown/70">
              Somos un espacio en {site.city} dedicado a las mejores picaderas y empanadas.
            </p>
            <p className="mt-4 font-script text-2xl text-green">{site.slogan}</p>
          </motion.div>
          
        </div>
        <div className="flex w-full gap-2 mt-12">
              {gallery.map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-label={photo.alt}
                  aria-pressed={selected === i}
                  className={`min-w-0 flex-1 overflow-hidden rounded-lg transition ${
                    selected === i
                      ? 'ring-2 ring-neon ring-offset-2 ring-offset-cream'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={photo.src} alt="" className="aspect-[4/3] h-full w-full object-cover" />
                </button>
              ))}
            </div>
      </div>
    </section>
  )
}
