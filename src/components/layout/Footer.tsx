import { site } from '../../data/site'
import { Logo } from './Logo'

const DEV_CONTACT = {
  whatsapp: "https://wa.me/18092251890",
  phone: "+1 (809) 225-1890",
  email: "phillip.brule@gmail.com",
};

export function Footer() {
  return (
    <footer className="border-t border-brown/10 bg-stone text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="inline-block rounded-2xl bg-cream px-4 py-2">
            <Logo variant="brown" className="h-10 w-auto" />
          </div>
          <p className="mt-3 text-sm text-cream/70">Sips & Bites</p>
          <p className="mt-4 font-script text-2xl text-honey/90">{site.slogan}</p>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-honey">
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
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-honey">
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
          <p className="mt-4 text-xs text-cream/50">Desarrollado por:</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-cream/50">
            
            <a
              href={DEV_CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-cream"
            >
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.614.614l4.458-1.495A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.319 0-4.489-.7-6.291-1.898l-.45-.3-2.663.893.893-2.663-.3-.45A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              {DEV_CONTACT.phone}
            </a>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${DEV_CONTACT.email}`} className="hover:text-cream">
              {DEV_CONTACT.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
