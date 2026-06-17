import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  GRUPAL_INCREMENTO,
  GRUPAL_TOTAL_PIEZAS,
  cajitaSizes,
  empaqueTipoLabel,
  empaqueTipoOptions,
  grupalBoxPrice,
  modalidadOptions,
  variedades,
  cajitaLabel,
  type CajitaSize,
  type EmpaqueTipo,
  type Modalidad,
} from '../../data/menu'
import { useCartStore } from '../../store/cartStore'
import { formatCurrency } from '../../utils/formatCurrency'
import { whatsAppUrl } from '../../data/site'

type Selections = Record<string, number>

function buildDetails(selections: Selections): string {
  return Object.entries(selections)
    .filter(([, count]) => count > 0)
    .map(([id, count]) => {
      const v = variedades.find((x) => x.id === id)
      return `${v?.name} ×${count}`
    })
    .join(', ')
}

function totalSelected(selections: Selections): number {
  return Object.values(selections).reduce((sum, n) => sum + n, 0)
}

function StepHeading({ n, title }: { n: number; title: string }) {
  return (
    <h3 className="font-display text-lg font-semibold text-brown">
      <span className="text-rust">{n}.</span> {title}
    </h3>
  )
}

function OptionButton({
  selected,
  onClick,
  children,
  className = '',
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border-2 p-4 text-left transition ${className} ${
        selected
          ? 'border-brown bg-brown text-cream shadow-md'
          : 'border-brown/15 bg-white text-brown hover:border-rust'
      }`}
    >
      {children}
    </button>
  )
}

export function EmpaqueBuilder() {
  const addCustomItem = useCartStore((s) => s.addCustomItem)

  const [modalidad, setModalidad] = useState<Modalidad | null>(null)
  const [empaqueTipo, setEmpaqueTipo] = useState<EmpaqueTipo | null>(null)
  const [cajita, setCajita] = useState<CajitaSize | null>(null)
  const [selections, setSelections] = useState<Selections>({})
  const [showCustomModal, setShowCustomModal] = useState(false)

  const isIndividual = modalidad === 'individual'
  const isGrupal = modalidad === 'grupal'

  const requiredPieces = isIndividual ? (cajita?.pieces ?? 0) : GRUPAL_TOTAL_PIEZAS
  const picked = totalSelected(selections)

  const showStep2 = isIndividual
  const showStep3 = isIndividual && empaqueTipo !== null
  const showStep4Individual = isIndividual && cajita !== null
  const showStep4Grupal = isGrupal
  const showStep4 = showStep4Individual || showStep4Grupal

  const isComplete = isIndividual
    ? cajita !== null && picked === requiredPieces
    : picked === GRUPAL_TOTAL_PIEZAS

  function resetFromModalidad() {
    setEmpaqueTipo(null)
    setCajita(null)
    setSelections({})
  }

  function selectModalidad(m: Modalidad) {
    setModalidad(m)
    resetFromModalidad()
  }

  function selectTipo(tipo: EmpaqueTipo) {
    setEmpaqueTipo(tipo)
    setCajita(null)
    setSelections({})
  }

  function selectCajita(box: CajitaSize) {
    setCajita(box)
    setSelections({})
  }

  function addIndividualVariedad(id: string) {
    if (!cajita) return
    const current = selections[id] ?? 0

    if (current >= 1) {
      setShowCustomModal(true)
      return
    }

    if (picked >= cajita.pieces) return

    setSelections((prev) => ({ ...prev, [id]: 1 }))
  }

  function removeIndividualVariedad(id: string) {
    setSelections((prev) => {
      const { [id]: _, ...rest } = prev
      return rest
    })
  }

  function addGrupalVariedad(id: string) {
    if (picked + GRUPAL_INCREMENTO > GRUPAL_TOTAL_PIEZAS) return
    setSelections((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + GRUPAL_INCREMENTO,
    }))
  }

  function removeGrupalVariedad(id: string) {
    setSelections((prev) => {
      const current = prev[id] ?? 0
      const next = current - GRUPAL_INCREMENTO
      if (next <= 0) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: next }
    })
  }

  function handleAdd() {
    if (!isComplete || !modalidad) return

    const details = buildDetails(selections)

    if (isIndividual && cajita && empaqueTipo) {
      addCustomItem({
        id: `individual-${Date.now()}`,
        name: `Empaque individual — ${cajitaLabel(cajita.pieces)} (${empaqueTipoLabel(empaqueTipo)})`,
        price: cajita.price,
        details,
      })
    } else if (isGrupal) {
      addCustomItem({
        id: `grupal-${Date.now()}`,
        name: `Empaque grupal — ${GRUPAL_TOTAL_PIEZAS} piezas`,
        price: grupalBoxPrice ?? 0,
        details: grupalBoxPrice === null ? `${details} (precio a cotizar)` : details,
      })
    }

    setModalidad(null)
    resetFromModalidad()
  }

  const customWhatsAppMessage = `¡Hola! Me gustaría cotizar un pedido personalizado con variedades repetidas en mi empaque individual.`

  return (
    <div className="space-y-10">
      {/* Paso 1 */}
      <div>
        <StepHeading n={1} title="Modalidad de empaque" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {modalidadOptions.map((opt) => (
            <OptionButton
              key={opt.id}
              selected={modalidad === opt.id}
              onClick={() => selectModalidad(opt.id)}
            >
              <p className="font-display font-semibold">{opt.label}</p>
              <p className={`mt-1 text-sm ${modalidad === opt.id ? 'text-cream/80' : 'text-brown/60'}`}>
                {opt.description}
              </p>
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Paso 2 — solo individual */}
      {showStep2 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <StepHeading n={2} title="Tipo de empaque" />
          <div className="mt-4 flex flex-wrap gap-3">
            {empaqueTipoOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => selectTipo(opt.id)}
                className={`rounded-full px-8 py-3 font-display text-sm font-semibold transition ${
                  empaqueTipo === opt.id
                    ? 'bg-brown text-cream shadow-md'
                    : 'border-2 border-brown/15 bg-white text-brown hover:border-rust'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Paso 3 — solo individual */}
      {showStep3 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <StepHeading n={3} title="Cantidad de piezas" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cajitaSizes.map((box) => (
              <OptionButton
                key={box.id}
                selected={cajita?.id === box.id}
                onClick={() => selectCajita(box)}
              >
                <p className="font-display font-semibold">{cajitaLabel(box.pieces)}</p>
                <p className={`mt-2 font-display text-lg font-bold ${cajita?.id === box.id ? 'text-honey' : 'text-rust'}`}>
                  {formatCurrency(box.price)}
                </p>
              </OptionButton>
            ))}
          </div>
        </motion.div>
      )}

      {/* Paso 4 */}
      {showStep4 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-brown/10 bg-white p-6"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <StepHeading n={isIndividual ? 4 : 2 } title="Elige tus variedades" />
              <p className="mt-1 text-sm text-brown/60">
                {isIndividual
                  ? `Cada pieza debe ser una variedad distinta. Selecciona ${requiredPieces} variedades.`
                  : `Cada clic suma ${GRUPAL_INCREMENTO} piezas. Arma un total de ${GRUPAL_TOTAL_PIEZAS} piezas.`}
              </p>
            </div>
            <p className={`font-display text-sm font-bold ${isComplete ? 'text-green' : 'text-rust'}`}>
              {picked} / {requiredPieces} piezas
            </p>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {variedades.map((v) => {
              const count = selections[v.id] ?? 0

              if (isIndividual) {
                const atMax = picked >= requiredPieces
                return (
                  <li
                    key={v.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-brown/10 bg-cream/50 px-4 py-3"
                  >
                    <span className="text-sm font-medium text-brown">{v.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => removeIndividualVariedad(v.id)}
                        disabled={count === 0}
                        aria-label={`Quitar ${v.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-brown/20 text-brown disabled:opacity-30"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm font-bold">{count}</span>
                      <button
                        type="button"
                        onClick={() => addIndividualVariedad(v.id)}
                        disabled={atMax && count === 0}
                        aria-label={`Añadir ${v.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-brown/20 text-brown disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>
                  </li>
                )
              }

              const canAdd = picked + GRUPAL_INCREMENTO <= GRUPAL_TOTAL_PIEZAS
              return (
                <li
                  key={v.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-brown/10 bg-cream/50 px-4 py-3"
                >
                  <span className="text-sm font-medium text-brown">{v.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => removeGrupalVariedad(v.id)}
                      disabled={count === 0}
                      aria-label={`Quitar ${v.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-brown/20 text-brown disabled:opacity-30"
                    >
                      −
                    </button>
                    <span className="min-w-[2ch] text-center text-sm font-bold">{count}</span>
                    <button
                      type="button"
                      onClick={() => addGrupalVariedad(v.id)}
                      disabled={!canAdd}
                      aria-label={`Añadir 5 ${v.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-brown/20 text-brown disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

          {isGrupal && grupalBoxPrice === null && (
            <p className="mt-4 text-sm text-brown/60">
              El precio del empaque grupal se confirmará al coordinar tu pedido.
            </p>
          )}

          <button
            type="button"
            onClick={handleAdd}
            disabled={!isComplete}
            className="mt-6 w-full rounded-full bg-brown py-3 font-display font-semibold text-cream transition hover:bg-brown-light disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-10"
          >
            Añadir al carrito
          </button>
        </motion.div>
      )}

      {/* Modal pedido personalizado */}
      <AnimatePresence>
        {showCustomModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-stone/50 backdrop-blur-sm"
              onClick={() => setShowCustomModal(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-cream p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="font-display text-xl font-bold text-brown">Pedido personalizado</h4>
              <p className="mt-3 text-sm leading-relaxed text-brown/70">
                En el empaque individual cada pieza debe ser una variedad distinta. Si deseas repetir
                variedades, necesitamos cotizar un pedido personalizado contigo.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="flex-1 rounded-full border border-brown/20 px-4 py-2.5 text-sm font-semibold text-brown"
                >
                  Entendido
                </button>
                <a
                  href={whatsAppUrl(customWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full bg-green px-4 py-2.5 text-center text-sm font-bold text-cream"
                >
                  Cotizar por WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
