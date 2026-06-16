import { motion } from 'framer-motion'
import { site } from '../../data/site'

const values = [
  {
    title: 'Sabor artesanal',
    description: 'Cada picadera preparada con dedicación, lista para sorprender a tus invitados.',
  },
  {
    title: 'Presentación impecable',
    description: 'Empaques individuales y grupales pensados para que tu evento luzca profesional.',
  },
  {
    title: 'Variedad para todos',
    description: 'Desde empanaditas hasta opciones dulces — hay algo para cada paladar.',
  },
]

export function AboutSection() {
  return (
    <section id="nosotros" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl shadow-lg"
          >
            <img
              src="/images/local.jpg"
              alt="Fachada de Savory Sips & Bites"
              className="aspect-[4/5] w-full object-cover"
            />
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
              Somos un espacio en {site.city} dedicado a las picaderas y los buenos momentos.
              Combinamos sabores caseros con una presentación moderna — porque compartir comida es
              una de las mejores formas de celebrar la vida.
            </p>
            <p className="mt-4 font-script text-2xl text-green">{site.slogan}</p>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-brown/10 bg-white p-6"
            >
              <span className="font-display text-3xl font-bold text-neon/80">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-brown">{value.title}</h3>
              <p className="mt-2 text-sm text-brown/70">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
