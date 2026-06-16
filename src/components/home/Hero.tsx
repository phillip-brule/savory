import { motion } from 'framer-motion'
import { site } from '../../data/site'

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-svh overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img
          src="/images/local.jpg"
          alt="Local de Savory Sips & Bites en Santiago"
          className="h-full w-full object-cover blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone/80 via-stone/60 to-stone/90" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6">

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-cream sm:text-5xl md:text-6xl"
        >
          {site.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-cream/85"
        >
          Variedades de picaderas para fiestas, reuniones y celebraciones en{' '}
          <span className="font-semibold text-neon">{site.city}</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#menu"
            className="rounded-full bg-neon px-8 py-3 font-display font-semibold text-stone transition hover:bg-neon-dark"
          >
            Ver menú
          </a>
          <a
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent('¡Hola! Me gustaría cotizar picaderas para un evento.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-cream/40 px-8 py-3 font-display font-semibold text-cream transition hover:border-neon hover:text-neon"
          >
            Cotiza con nosotros
          </a>
        </motion.div>
      </div>
    </section>
  )
}
