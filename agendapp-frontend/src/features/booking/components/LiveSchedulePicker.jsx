// LiveSchedulePicker.jsx — Paso 3: selector de día y grilla de horas con 4 estados.

/**
 * days:  [{ id: '2026-10-24', label: 'Jue', dayNumber: 24, closed: false }, ...]
 * slots: [{ time: '01:30 PM', status: 'free' | 'busy' | 'locked' }, ...]
 *   - free:   disponible
 *   - busy:   ocupado por otra reserva confirmada
 *   - locked: bloqueado temporalmente por OTRO cliente (en proceso de pago)
 * El estado "seleccionado" NO viene en los datos: se deduce de selectedTime.
 */
export default function LiveSchedulePicker({
  days = [],            // días disponibles para mostrar
  slots = [],           // horas del día seleccionado
  selectedDate,         // id del día elegido (o null)
  selectedTime,         // hora elegida (o null)
  onSelectDate,         // función(dayId)
  onSelectTime,         // función(time)
}) {
  return (
    <section aria-labelledby="step-schedule">
      <h2 id="step-schedule" className="mb-3 text-lg font-bold text-content">
        <span className="mr-2 text-accent">3.</span>
        Elige día y hora
      </h2>

      {/* ---------- Selector de días ---------- */}
      <ul className="-mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-2">
        {days.map((day) => {
          const isSelected = selectedDate === day.id

          return (
            <li key={day.id}>
              <button
                type="button"
                disabled={day.closed}            // un día cerrado no se puede elegir
                aria-pressed={isSelected}
                onClick={() => onSelectDate(day.id)}
                className={[
                  'flex w-16 shrink-0 cursor-pointer flex-col items-center gap-0.5 rounded-2xl border py-3',
                  'transition-all duration-200',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                  'disabled:cursor-not-allowed disabled:opacity-40',
                  isSelected
                    ? 'border-accent bg-accent text-accent-fg shadow-card'
                    : 'border-surface-border bg-surface text-content hover:border-elevated-border',
                ].join(' ')}
              >
                <span className="text-xs font-medium opacity-80">{day.label}</span>
                <span className="text-xl font-bold">{day.dayNumber}</span>
                {/* Etiqueta bajo el número solo si el día está cerrado */}
                {day.closed && <span className="text-[10px] font-semibold">Cerrado</span>}
              </button>
            </li>
          )
        })}
      </ul>

      {/* ---------- Grilla de horas ---------- */}
      {!selectedDate ? (
        // Estado vacío: aún no se eligió día
        <p className="rounded-2xl border border-dashed border-surface-border p-6 text-center text-sm text-content-muted">
          Selecciona un día para ver los horarios disponibles.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {slots.map((slot) => {
            // Prioridad: primero revisamos si es MI turno; luego el estado del dato.
            const isMine = slot.time === selectedTime
            const status = isMine ? 'selected' : slot.status

            // Mapa estado -> clases (todo con tokens, ningún color fijo)
            const STYLES = {
              free: 'border-surface-border bg-surface text-content hover:border-accent cursor-pointer',
              busy: 'border-surface-border bg-elevated text-content-muted line-through cursor-not-allowed',
              locked: 'border-amber-line bg-amber-soft text-amber-fg cursor-not-allowed',
              selected: 'border-accent bg-accent text-accent-fg shadow-card cursor-pointer',
            }

            // Solo se puede pulsar si está libre o si es el propio turno
            const isDisabled = status === 'busy' || status === 'locked'

            return (
              <li key={slot.time}>
                <button
                  type="button"
                  disabled={isDisabled}
                  aria-pressed={isMine}
                  onClick={() => onSelectTime(slot.time)}
                  className={[
                    'w-full rounded-xl border px-3 py-3 text-sm font-semibold',
                    'transition-all duration-200',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                    STYLES[status] ?? STYLES.free,
                  ].join(' ')}
                >
                  {slot.time}
                  {/* Texto extra según el estado */}
                  {status === 'locked' && <span className="block text-xs font-medium">Bloqueado ⏳</span>}
                  {status === 'busy' && <span className="block text-xs font-medium no-underline">Ocupado</span>}
                  {status === 'selected' && (
                    <span className="block text-xs font-bold tracking-wide">TU TURNO</span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
