import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  GRUPAL_INCREMENTO,
  GRUPAL_MAX_PERSONAS,
  GRUPAL_MAX_PIEZAS,
  GRUPAL_MIN_PERSONAS,
  GRUPAL_MIN_PIEZAS,
  cajitaSizes,
  empaqueTipoLabel,
  empaqueTipoOptions,
  calculateGrupalTotal,
  calculatePiecesSubtotal,
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
  const [personas, setPersonas] = useState(0)
  const [selections, setSelections] = useState<Selections>({})
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [showAddedToast, setShowAddedToast] = useState(false)

  const isIndividual = modalidad === 'individual'
  const isGrupal = modalidad === 'grupal'

  const requiredPieces = isIndividual ? (cajita?.pieces ?? 0) : GRUPAL_MIN_PIEZAS
  const picked = totalSelected(selections)

  const showStep2 = isIndividual
  const showStep3 = isIndividual && empaqueTipo !== null
  const showStep2Grupal = isGrupal
  const showStep4Individual = isIndividual && cajita !== null
  const showStep3Grupal = isGrupal && personas >= GRUPAL_MIN_PERSONAS
  const showStep4 = showStep4Individual || showStep3Grupal

  const grupalStepVariedades = isGrupal ? 3 : 4

  const isComplete = isIndividual
    ? cajita !== null && picked === requiredPieces
    : personas >= GRUPAL_MIN_PERSONAS &&
      personas <= GRUPAL_MAX_PERSONAS &&
      picked >= GRUPAL_MIN_PIEZAS &&
      picked <= GRUPAL_MAX_PIEZAS

  const grupalPiecesSubtotal = isGrupal ? calculatePiecesSubtotal(selections) : 0
  const grupalTotal = isGrupal ? calculateGrupalTotal(selections) : 0

  function resetFromModalidad() {
    setEmpaqueTipo(null)
    setCajita(null)
    setPersonas(0)
    setSelections({})
  }

  function resetBuilder() {
    setModalidad(null)
    resetFromModalidad()
    setIsClosing(false)
    setShowAddedToast(false)
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

  function handlePersonasChange(raw: string) {
    if (raw === '') {
      setPersonas(0)
      setSelections({})
      return
    }

    const next = Number.parseInt(raw, 10)
    if (Number.isNaN(next)) return

    setPersonas(Math.min(GRUPAL_MAX_PERSONAS, Math.max(0, next)))
    setSelections({})
  }

  function adjustPersonas(delta: number) {
    setPersonas((prev) => {
      const next = Math.min(GRUPAL_MAX_PERSONAS, Math.max(0, prev + delta))
      return next
    })
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
    if (picked + GRUPAL_INCREMENTO > GRUPAL_MAX_PIEZAS) return
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
    if (!isComplete || !modalidad || isClosing) return

    const varietyDetails = buildDetails(selections)

    if (isIndividual && cajita && empaqueTipo) {
      addCustomItem({
        id: `individual-${Date.now()}`,
        name: `Empaque individual — ${cajitaLabel(cajita.pieces)} (${empaqueTipoLabel(empaqueTipo)})`,
        price: cajita.price,
        details: varietyDetails,
      })
    } else if (isGrupal && personas >= GRUPAL_MIN_PERSONAS) {
      const piecesSubtotal = calculatePiecesSubtotal(selections)
      const totalPrice = grupalBoxPrice + piecesSubtotal
      addCustomItem({
        id: `grupal-${Date.now()}`,
        name: `Empaque grupal — ${picked} piezas (${personas} personas)`,
        price: totalPrice,
        details: `Personas: ${personas} | ${varietyDetails} | Empaque: ${formatCurrency(grupalBoxPrice)} + picaderas: ${formatCurrency(piecesSubtotal)}`,
      })
    }

    setShowAddedToast(true)
    setIsClosing(true)

    window.setTimeout(() => {
      resetBuilder()
    }, 650)
  }

  const customWhatsAppMessage = `¡Hola! Me gustaría cotizar un pedido personalizado con variedades repetidas en mi empaque individual.`

  return (
    <div className="relative space-y-10">
      <AnimatePresence>
        {showAddedToast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center"
          >
            <div className="rounded-full bg-green px-5 py-2.5 font-display text-sm font-semibold text-cream shadow-lg">
              ¡Añadido al carrito!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      <AnimatePresence mode="popLayout">
        {modalidad && (
          <motion.div
            key={modalidad}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isClosing ? 0 : 1, height: isClosing ? 0 : 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="space-y-10 overflow-hidden"
          >
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

      {showStep2Grupal && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <StepHeading n={2} title="Cantidad de personas" />
          <p className="mt-2 text-sm leading-relaxed text-brown/70">
            La caja grupal incluye servilletas y cubiertos para que tu grupo tenga una experiencia completa.
          </p>
          <div className="mt-4 max-w-xs rounded-2xl border border-brown/10 bg-white p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rust">Personas *</span>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => adjustPersonas(-1)}
                disabled={personas <= 0}
                aria-label="Restar personas"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brown/20 text-brown disabled:opacity-30"
              >
                −
              </button>
              <input
                type="number"
                min={0}
                max={GRUPAL_MAX_PERSONAS}
                value={personas}
                onChange={(e) => handlePersonasChange(e.target.value)}
                className="w-full rounded-xl border-2 border-brown/15 bg-cream px-4 py-3 text-center font-display text-2xl font-bold text-brown focus:border-brown focus:outline-none"
                aria-label="Cantidad de personas"
              />
              <button
                type="button"
                onClick={() => adjustPersonas(1)}
                disabled={personas >= GRUPAL_MAX_PERSONAS}
                aria-label="Sumar personas"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brown/20 text-brown disabled:opacity-30"
              >
                +
              </button>
            </div>
            <p className="mt-3 text-xs text-brown/50">
              Escribe o usa +/−. Mínimo {GRUPAL_MIN_PERSONAS} personas para continuar.
            </p>
          </div>
        </motion.div>
      )}

      {showStep4 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-brown/10 bg-white p-6"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <StepHeading
                n={isIndividual ? 4 : grupalStepVariedades}
                title="Elige tus variedades"
              />
              <p className="mt-1 text-sm text-brown/60">
                {isIndividual
                  ? `Cada pieza debe ser una variedad distinta. Selecciona ${requiredPieces} variedades.`
                  : `Cada clic suma ${GRUPAL_INCREMENTO} piezas. Mínimo ${GRUPAL_MIN_PIEZAS} y máximo ${GRUPAL_MAX_PIEZAS} piezas.`}
              </p>
            </div>
            <p className={`font-display text-sm font-bold ${isComplete ? 'text-green' : 'text-rust'}`}>
              {picked}
              {isIndividual ? ` / ${requiredPieces} piezas` : ` piezas`}
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

              const canAdd = picked + GRUPAL_INCREMENTO <= GRUPAL_MAX_PIEZAS
              return (
                <li
                  key={v.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-brown/10 bg-cream/50 px-4 py-3"
                >
                  <div>
                    <span className="text-sm font-medium text-brown">{v.name}</span>
                    <p className="mt-0.5 text-xs text-brown/55">{formatCurrency(v.price)} c/u</p>
                  </div>
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

          {isGrupal && (
            <div className="mt-4 rounded-xl bg-cream-dark/60 px-4 py-3 text-sm text-brown/80">
              <div className="flex justify-between">
                <span>Empaque base (incl. servilletas y cubiertos)</span>
                <span>{formatCurrency(grupalBoxPrice)}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span>Picaderas ({picked} piezas)</span>
                <span>{formatCurrency(grupalPiecesSubtotal)}</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-brown/10 pt-2 font-display font-bold text-brown">
                <span>Total estimado</span>
                <span className="text-rust">{formatCurrency(grupalTotal)}</span>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleAdd}
            disabled={!isComplete || isClosing}
            className="mt-6 w-full rounded-full bg-brown py-3 font-display font-semibold text-cream transition hover:bg-brown-light disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-10"
          >
            {isClosing ? 'Añadiendo…' : 'Añadir al carrito'}
          </button>
        </motion.div>
      )}

          </motion.div>
        )}
      </AnimatePresence>

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
