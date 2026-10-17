// Badge.jsx — Insignia (píldora) reutilizable para estados.

// Mapa de variantes: cada clave apunta a clases Tailwind que usan los tokens
// del @theme de index.css. Ningún color está fijo, así que cambian solos con .dark.
const VARIANTS = {
  // Verde: "ABIERTO AHORA", "Sincronizado", "Reserva hoy abonando solo el 5%"
  emerald: 'bg-emerald-soft border-emerald-line text-emerald-fg',

  // Ámbar: "01:30 PM Bloqueado ⏳"
  amber: 'bg-amber-soft border-amber-line text-amber-fg',

  // Lavanda/índigo suave: etiquetas de acento
  accent: 'bg-accent-soft border-accent text-accent',

  // Neutra: información secundaria
  neutral: 'bg-elevated border-surface-border text-content-secondary',
}

// Tamaños: sm para píldoras dentro de tarjetas, md para la portada.
const SIZES = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-3 py-1 text-xs',
}

export default function Badge({
  variant = 'neutral', // color/estado de la insignia
  size = 'md',         // tamaño
  icon = null,         // elemento opcional a la izquierda (ej. un punto o ícono)
  className = '',      // clases extra del padre, sin romper las del componente
  children,            // el texto de la insignia
}) {
  return (
    <span
      className={[
        // Base: píldora en línea con borde de 1px
        'inline-flex items-center gap-1.5 rounded-full border',
        'font-semibold uppercase tracking-wide whitespace-nowrap',
        VARIANTS[variant] ?? VARIANTS.neutral, // si la variante no existe, usa neutral
        SIZES[size] ?? SIZES.md,
        className,
      ].join(' ')}
    >
      {icon}
      {children}
    </span>
  )
}
