// StaffCarousel.jsx — Paso 2: selector horizontal de profesional.
import { Users } from 'lucide-react' // ícono para la opción "Cualquiera"

/**
 * Forma esperada de cada profesional:
 * { id: 'any',  name: 'Cualquiera', role: 'Más rápido' }
 * { id: 'ana',  name: 'Ana R.',     role: 'Estilista Senior' }
 * { id: 'carlos', name: 'Carlos M.', role: 'Colorista Master' }
 */
export default function StaffCarousel({
  staffList = [],     // lista de profesionales (incluye la opción "Cualquiera")
  selectedStaff,      // profesional elegido (objeto o null)
  onSelect,           // función(staff) al elegir una tarjeta
}) {
  // Iniciales para el avatar: "Ana R." -> "AR"
  const getInitials = (name) =>
    name
      .split(' ')
      .map((word) => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()

  return (
    <section aria-labelledby="step-staff">
      <h2 id="step-staff" className="mb-3 text-lg font-bold text-content">
        <span className="mr-2 text-accent">2.</span>
        Elige tu profesional
      </h2>

      {/* Contenedor con scroll horizontal.
          snap-x + snap-start: al deslizar, las tarjetas "encajan" una a una (efecto carrusel).
          -mx-1 px-1 evita que el anillo de foco/selección se recorte en los bordes. */}
      <ul className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2">
        {staffList.map((staff) => {
          const isSelected = selectedStaff?.id === staff.id

          return (
            <li key={staff.id} className="snap-start">
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelect(staff)}
                className={[
                  // w-36 shrink-0: ancho fijo para que el scroll horizontal funcione
                  'flex w-36 shrink-0 cursor-pointer flex-col items-center gap-2 rounded-2xl border p-4 text-center',
                  'transition-all duration-200 hover:-translate-y-0.5',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                  isSelected
                    ? 'border-accent bg-accent-soft shadow-card'
                    : 'border-surface-border bg-surface hover:border-elevated-border',
                ].join(' ')}
              >
                {/* Avatar: ícono para "Cualquiera", iniciales para personas */}
                <span
                  className={[
                    'flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold',
                    isSelected
                      ? 'bg-accent text-accent-fg'
                      : 'bg-elevated text-content-secondary',
                  ].join(' ')}
                >
                  {staff.id === 'any' ? <Users size={20} /> : getInitials(staff.name)}
                </span>

                <span className="text-sm font-semibold text-content">{staff.name}</span>
                <span className="text-xs text-content-muted">{staff.role}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
