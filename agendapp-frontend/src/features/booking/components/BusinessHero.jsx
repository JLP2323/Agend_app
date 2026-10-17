// BusinessHero.jsx — Portada del negocio: cover, logo, estado, rating y ubicación.
import { Clock, MapPin, Star } from 'lucide-react'   // íconos
import Badge from '../../../components/ui/Badge'      // insignia "ABIERTO AHORA"

export default function BusinessHero({
  name = 'Salón Lumina',                    // nombre del negocio
  coverImage = null,                        // URL de la portada (opcional)
  logo = null,                              // URL del logo (opcional)
  isOpen = true,                            // ¿está abierto ahora?
  rating = 4.9,                             // calificación promedio
  reviewCount = 128,                        // cantidad de reseñas
  timezone = 'GMT-5 (America/Guayaquil)',   // zona horaria del negocio
  location = 'Cumbayá, Quito',              // ubicación
}) {
  // Iniciales para el logo cuando no hay imagen: "Salón Lumina" -> "SL"
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <section className="overflow-hidden rounded-2xl border border-surface-border bg-surface shadow-card">

      {/* Portada: imagen real si existe, degradado con tokens si no */}
      <div className="relative h-36 sm:h-48">
        {coverImage ? (
          <img src={coverImage} alt={`Portada de ${name}`} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-accent-soft via-elevated to-surface" />
        )}
      </div>

      {/* Contenido bajo la portada */}
      <div className="px-5 pb-5 sm:px-6">

        {/* Logo circular: -mt-12 lo sube para solaparse con la portada.
            ring-surface crea un "marco" del color de la tarjeta alrededor. */}
        <div className="-mt-12 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-accent text-2xl font-bold text-accent-fg ring-4 ring-surface">
          {logo ? (
            <img src={logo} alt={`Logo de ${name}`} className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </div>

        {/* Nombre + insignia de estado */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold text-content">{name}</h2>

          <Badge
            variant={isOpen ? 'emerald' : 'neutral'}
            // Punto animado (solo si está abierto): "latido" de estado en vivo
            icon={
              isOpen && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-fg opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-fg" />
                </span>
              )
            }
          >
            {isOpen ? 'Abierto ahora' : 'Cerrado'}
          </Badge>
        </div>

        {/* Metadatos: rating, zona horaria y ubicación */}
        <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-content-secondary">
          <li className="flex items-center gap-1.5">
            {/* La estrella usa el color ámbar de los tokens */}
            <Star size={16} className="fill-amber-fg text-amber-fg" />
            <span className="font-semibold text-content">{rating}</span>
            <span className="text-content-muted">({reviewCount})</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Clock size={16} className="text-content-muted" />
            {timezone}
          </li>
          <li className="flex items-center gap-1.5">
            <MapPin size={16} className="text-content-muted" />
            {location}
          </li>
        </ul>
      </div>
    </section>
  )
}
