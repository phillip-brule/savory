import { motion } from 'framer-motion'
import { site, whatsAppUrl } from '../../data/site'

export function ContactSection() {
  return (
    <section id="contacto" className="bg-cream-dark py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-green">
            Contacto
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold text-brown">Visítanos</h2>
          <p className="mx-auto mt-4 max-w-xl text-brown/70">
            Encuéntranos en {site.city}. Escríbenos por WhatsApp para cotizaciones y más
            información.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-brown/10 bg-white p-6">
              <h3 className="font-display font-semibold text-brown">WhatsApp</h3>
              <a
                href={whatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-lg font-bold text-green hover:underline"
              >
                {site.whatsappDisplay}
              </a>
            </div>

            <div className="rounded-2xl border border-brown/10 bg-white p-6">
              <h3 className="font-display font-semibold text-brown">Ubicación</h3>
              <p className="mt-2 leading-relaxed text-brown/70">{site.address}</p>
              <p className="mt-1 text-sm text-brown/60">
                {site.city}, {site.country}
              </p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-brown px-6 py-2.5 font-display text-sm font-semibold text-cream transition hover:bg-brown-light"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                </svg>
                Ver ubicación
              </a>
            </div>

            <a
              href={whatsAppUrl('¡Hola Savory! Quisiera más información.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-display font-semibold text-white transition hover:opacity-90"
            >
              Escríbenos por WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="overflow-hidden rounded-2xl border border-brown/10 shadow-sm"
          >
            <iframe
              title="Ubicación de Savory Sips & Bites en Google Maps"
              src={site.mapsEmbed}
              className="h-full min-h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
