// InputField.jsx — Campo de formulario con etiqueta, prefijo opcional y error.
import { useId } from 'react'

export default function InputField({
  label,               // texto de la etiqueta: "Nombre completo"
  prefix = null,       // prefijo opcional a la izquierda: "🇪🇨 +593"
  error = '',          // mensaje de error; si existe, el campo se pinta en rojo
  hint = '',           // texto de ayuda bajo el campo
  type = 'text',
  className = '',      // clases extra para el contenedor
  ...rest              // value, onChange, placeholder, name, required, etc.
}) {
  // useId genera un id único y estable: conecta <label htmlFor> con <input id>
  // para que al hacer clic en la etiqueta se enfoque el campo (accesibilidad).
  const id = useId()

  return (
    <div className={['flex flex-col gap-1.5', className].join(' ')}>
      {/* Etiqueta del campo */}
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-content-secondary">
          {label}
        </label>
      )}

      {/* Contenedor con borde: el prefijo y el input comparten el mismo borde.
          focus-within resalta todo el conjunto cuando el input interno tiene el foco. */}
      <div
        className={[
          'flex items-stretch overflow-hidden rounded-xl border bg-elevated',
          'transition-colors duration-200',
          'focus-within:border-accent focus-within:ring-2 focus-within:ring-accent-soft',
          // Borde rojo si hay error, borde normal si no
          error ? 'border-danger-fg' : 'border-elevated-border',
        ].join(' ')}
      >
        {/* Prefijo telefónico (solo si se envía la prop) */}
        {prefix && (
          <span className="flex items-center border-r border-elevated-border bg-surface px-3 text-sm font-medium text-content-secondary select-none">
            {prefix}
          </span>
        )}

        <input
          id={id}
          type={type}
          // aria-invalid avisa a lectores de pantalla que el campo tiene error
          aria-invalid={error ? 'true' : 'false'}
          className="w-full bg-transparent px-3 py-2.5 text-sm text-content placeholder:text-content-muted outline-none"
          {...rest}
        />
      </div>

      {/* Mensaje de error (tiene prioridad) o texto de ayuda */}
      {error ? (
        <p role="alert" className="text-xs text-danger-fg">{error}</p>
      ) : (
        hint && <p className="text-xs text-content-muted">{hint}</p>
      )}
    </div>
  )
}
