// ServiceSelectList.jsx — Paso 1: lista de servicios con su abono del 5%.
import { Check, Clock } from 'lucide-react'
import Badge from '../../../components/ui/Badge'                     // píldora del abono
import { calculateDeposit, formatUSD } from '../../../utils/currency' // Fase 2

/**
 * Forma esperada de cada servicio:
 * { id: 'corte', name: 'Corte & Estilo Signature', description: '...', duration: 45, price: 20 }
 */
export default function ServiceSelectList({
  services = [],        // catálogo de servicios (lo entrega el padre / luego el backend)
  selectedService,      // servicio elegido actualmente (objeto o null)
  onSelect,             // función(service) que se ejecuta al elegir una tarjeta
}) {
  return (
    <section aria-labelledby="step-service">
      {/* Encabezado del paso */}
      <h2 id="step-service" className="mb-3 text-lg font-bold text-content">
        <span className="mr-2 text-accent">1.</span>
        Elige tu servicio
      </h2>

      <ul className="flex flex-col gap-3">
        {services.map((service) => {
          const isSelected = selectedService?.id === service.id
          // Abono calculado con la utilidad de la Fase 2 (nunca a mano en el componente)
          const { deposit } = calculateDeposit(service.price)

          return (
            <li key={service.id}>
              {/* Toda la tarjeta es un <button>: accesible con teclado y lector de pantalla.
                  aria-pressed indica si está seleccionada. */}
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelect(service)}
                className={[
                  'w-full cursor-pointer rounded-2xl border p-4 text-left',
                  'transition-all duration-200 hover:-translate-y-0.5',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                  // Seleccionada: borde y fondo de acento. Si no: tarjeta normal.
                  isSelected
                    ? 'border-accent bg-accent-soft shadow-card'
                    : 'border-surface-border bg-surface hover:border-elevated-border',
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-content">{service.name}</h3>
                    <p className="mt-0.5 text-sm text-content-secondary">{service.description}</p>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-content-muted">
                      <Clock size={14} />
                      {service.duration} min
                    </p>
                  </div>

                  {/* Precio + check de selección */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-lg font-bold text-content">
                      ${service.price}
                    </span>
                    {isSelected && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-fg">
                        <Check size={14} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                </div>

                {/* Píldora del abono: "Reserva hoy abonando solo el 5% ($1.00 USD)" */}
                <Badge variant="emerald" size="sm" className="mt-3 normal-case">
                  Reserva hoy abonando solo el 5% ({formatUSD(deposit)})
                </Badge>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
