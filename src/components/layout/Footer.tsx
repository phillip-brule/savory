import { site } from '../../data/site'

export function Footer() {
  return (
    <footer className="border-t border-brown/10 bg-stone text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl font-bold text-neon">{site.shortName}</p>
          <p className="mt-2 text-sm text-cream/70">Sips & Bites</p>
          <p className="mt-4 font-script text-2xl text-neon/90">{site.slogan}</p>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-wood">
            Ubicación
          </p>
          <p className="mt-2 text-sm text-cream/80">{site.address}</p>
          <p className="mt-2 text-sm text-cream/80">{site.city}</p>
          <p className="text-sm text-cream/80">{site.country}</p>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-neon hover:underline"
          >
            Ver en Google Maps →
          </a>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-wood">
            Contacto
          </p>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-sm font-semibold text-cream hover:text-neon"
          >
            WhatsApp: {site.whatsappDisplay}
          </a>
          <p className="mt-4 text-xs text-cream/50">
            © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
