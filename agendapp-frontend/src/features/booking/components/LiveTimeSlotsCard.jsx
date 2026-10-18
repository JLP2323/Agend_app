// LiveTimeSlotsCard.jsx — Columna derecha (4 cols): Lista vertical de horarios en vivo
// con los 4 estados exactos del diseño: Libre, Ocupado, Bloqueado (pago en curso) y TU TURNO ACTIVO.
import { Clock, Hourglass, Check } from 'lucide-react'
import { useBookingFlow } from '../context/BookingFlowContext'

// Horarios de ejemplo para el Sábado 24 Oct con los estados requeridos
const SLOTS_DATA = [
  { time: '09:00 AM', status: 'free' },
  { time: '10:00 AM', status: 'busy' },
  { time: '01:30 PM', status: 'locked' }, // Bloqueado por otro cliente temporalmente
  { time: '04:30 PM', status: 'free' },   // Turno sugerido por defecto
  { time: '05:30 PM', status: 'free' },
]

export default function LiveTimeSlotsCard() {
  const { time: selectedTime, selectTime } = useBookingFlow()

  // Si no hay horario elegido en el contexto aún, se toma '04:30 PM' como default activo
  const currentTime = selectedTime || '04:30 PM'

  return (
    <div className="rounded-2xl border border-surface-border bg-surface p-4 shadow-card">
      {/* 1. Cabecera: Título y Píldora del Día Seleccionado */}
      <div className="flex items-center justify-between pb-3 border-b border-surface-border/70">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-emerald-fg" />
          <h3 className="text-sm font-bold text-content">
            Horarios en Vivo
          </h3>
        </div>

        {/* Píldora esmeralda del día activo */}
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-line bg-emerald-soft px-2.5 py-0.5 text-[11px] font-semibold text-emerald-fg">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-fg" />
          Sábado 24 Oct
        </span>
      </div>

      {/* 2. Lista Vertical de Bloques Horarios */}
      <div className="mt-3 flex flex-col gap-2">
        {SLOTS_DATA.map((slot) => {
          // El estado "seleccionado / tu turno" se evalúa comparando con el estado global
          const isSelected = currentTime === slot.time
          const effectiveStatus = isSelected ? 'selected' : slot.status
          const isDisabled = effectiveStatus === 'busy' || effectiveStatus === 'locked'

          return (
            <button
              key={slot.time}
              type="button"
              disabled={isDisabled}
              onClick={() => selectTime(slot.time)}
              className={[
                'flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-150',
                // ESTADO 1: TU TURNO ACTIVO (Lavanda brillante / Acento de alto impacto)
                effectiveStatus === 'selected'
                  ? 'bg-accent text-accent-fg font-bold shadow-md cursor-pointer'
                  // ESTADO 2: BLOQUEADO (Ámbar translúcido con reloj de arena)
                  : effectiveStatus === 'locked'
                  ? 'border border-amber-line bg-amber-soft text-amber-fg cursor-not-allowed opacity-90'
                  // ESTADO 3: OCUPADO (Gris atenuado tachado)
                  : effectiveStatus === 'busy'
                  ? 'border border-surface-border bg-elevated/40 text-content-muted/60 line-through cursor-not-allowed'
                  // ESTADO 4: LIBRE (Superficie limpia interactiva con hover sutil)
                  : 'border border-surface-border bg-surface text-content hover:border-accent hover:bg-elevated/50 cursor-pointer',
              ].join(' ')}
            >
              {/* Lado Izquierdo: Icono/Círculo + Hora */}
              <div className="flex items-center gap-2.5">
                {effectiveStatus === 'selected' ? (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent-fg text-accent">
                    <Check size={11} strokeWidth={3} />
                  </span>
                ) : effectiveStatus === 'locked' ? (
                  <Hourglass size={14} className="text-amber-fg shrink-0" />
                ) : (
                  <span
                    className={[
                      'h-2 w-2 rounded-full',
                      effectiveStatus === 'free' ? 'bg-emerald-fg' : 'bg-content-muted/40',
                    ].join(' ')}
                  />
                )}

                <span className={effectiveStatus === 'selected' ? 'font-bold' : ''}>
                  {slot.time}
                </span>
              </div>

              {/* Lado Derecho: Etiqueta de Estado */}
              <div>
                {effectiveStatus === 'selected' && (
                  <span className="rounded bg-accent-fg/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-accent-fg">
                    TU TURNO ACTIVO
                  </span>
                )}

                {effectiveStatus === 'locked' && (
                  <span className="text-[11px] font-medium text-amber-fg">
                    Bloqueado (pago en curso)
                  </span>
                )}

                {effectiveStatus === 'busy' && (
                  <span className="text-[11px] font-normal text-content-muted no-underline">
                    Ocupado
                  </span>
                )}

                {effectiveStatus === 'free' && (
                  <span className="text-[11px] font-medium text-emerald-fg">
                    Libre
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
