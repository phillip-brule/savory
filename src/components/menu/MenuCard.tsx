import { motion } from 'framer-motion'
import type { MenuItem } from '../../data/menu'
import { formatCurrency } from '../../utils/formatCurrency'
import { site, whatsAppUrl } from '../../data/site'

interface MenuCardProps {
  item: MenuItem
  index: number
}

export function MenuCard({ item, index }: MenuCardProps) {
  const isQuoteOnly = item.price === null

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-cream-dark to-cream">
            <span className="font-display text-5xl font-bold text-green/20">{site.shortName}</span>
          </div>
        )}
        {item.price !== null && (
          <span className="absolute right-3 top-3 rounded-full bg-green px-3 py-1 text-sm font-bold text-cream">
            {formatCurrency(item.price)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-brown">{item.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brown/70">{item.description}</p>

        {isQuoteOnly ? (
          <a
            href={whatsAppUrl(`¡Hola! Me interesa el ${item.name}. ¿Podrían darme una cotización?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-full border-2 border-green px-4 py-2 text-sm font-bold text-green transition hover:bg-green hover:text-cream"
          >
            Solicitar cotización
          </a>
        ) : (
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-brown/40">
            Pedidos en línea — próximamente
          </p>
        )}
      </div>
    </motion.article>
  )
}
