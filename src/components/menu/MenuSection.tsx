import { EmpaqueBuilder } from './EmpaqueBuilder'
import { Logo } from '../layout/Logo'

export function MenuSection() {
  return (
    <section id="menu" className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <Logo variant="green" className="mx-auto h-14 w-auto" />
          <p className="mt-4 font-display text-sm font-semibold uppercase tracking-widest text-rust">
            Menú de picaderas
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold text-brown sm:text-5xl">
            Haz tu pedido con anticipación
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-brown/70">
            Arma tu pedido aquí y elige la fecha de pick-up con mínimo 24 horas de antelación.
          </p>
        </div>

        <div className="mt-10">
          <EmpaqueBuilder />
        </div>
      </div>
    </section>
  )
}
