// Button.jsx — Botón reutilizable con variantes, tamaños y estado de carga.

// Variantes: todas usan tokens de index.css, ningún color fijo.
const VARIANTS = {
  // Botón principal: "Pagar abono de $1.00 USD y Confirmar Cita"
  primary:
    'bg-accent text-accent-fg hover:bg-accent-hover shadow-card',

  // Botón secundario: superficie elevada con borde (ej. "Volver")
  secondary:
    'bg-elevated text-content border border-elevated-border hover:border-accent',

  // Sin fondo: acciones discretas (ej. el botón sol/luna del navbar)
  ghost:
    'bg-transparent text-content-secondary hover:bg-elevated hover:text-content',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3.5 text-base rounded-xl', // el botón de pago es lg
}

export default function Button({
  variant = 'primary',  // estilo visual
  size = 'md',          // tamaño
  fullWidth = false,    // true => ocupa todo el ancho de la tarjeta
  loading = false,      // true => muestra spinner y bloquea el clic
  icon = null,          // elemento opcional a la izquierda (ej. un candado 🔒)
  type = 'button',      // 'button' por defecto para no enviar formularios por accidente
  disabled = false,
  className = '',
  children,
  ...rest               // onClick, aria-label, id, etc. se pasan tal cual al <button>
}) {
  // Un botón en carga también debe estar deshabilitado
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={[
        // Base: flex centrado, transición suave, animación al presionar
        'inline-flex items-center justify-center gap-2 font-semibold',
        'transition-all duration-200 active:scale-[0.98] cursor-pointer',
        // Foco visible para teclado, con el color de acento
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        // Estado deshabilitado
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        VARIANTS[variant] ?? VARIANTS.primary,
        SIZES[size] ?? SIZES.md,
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {loading ? (
        // Spinner: círculo con borde parcial que gira (animate-spin de Tailwind)
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : (
        icon
      )}
      {children}
    </button>
  )
}
