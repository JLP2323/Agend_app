// PublicNavbar.jsx — Cabecera del portal público de reservas.
import { Moon, Sun } from 'lucide-react'          // íconos (ya instalados con npm)
import { useTheme } from '../../context/ThemeContext' // hook de la Fase 2
import Button from '../ui/Button'                    // botón ghost para el tema

export default function PublicNavbar({
  businessName = 'KALLISTO STUDIO', // nombre del negocio en la cabecera
  subtitle = 'Booking Checkout',    // texto secundario
  userInitials = 'JD',              // iniciales que se muestran en el avatar
}) {
  // Leemos el tema actual y la función para alternarlo desde el contexto
  const { isDark, toggleTheme } = useTheme()

  return (
    // sticky: la barra queda fija arriba al hacer scroll.
    // backdrop-blur + fondo semitransparente: efecto "cristal".
    <header className="sticky top-0 z-40 border-b border-surface-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">

        {/* Izquierda: marca + subtítulo */}
        <div className="flex flex-col leading-tight">
          <h1 className="text-sm font-bold tracking-[0.2em] text-content">
            {businessName}
          </h1>
          <span className="text-xs text-content-muted">{subtitle}</span>
        </div>

        {/* Derecha: botón de tema + avatar */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            // Texto para lectores de pantalla, porque el botón solo tiene un ícono
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            // Si estamos en oscuro mostramos el sol (la acción disponible), y viceversa
            icon={isDark ? <Sun size={18} /> : <Moon size={18} />}
          />

          {/* Avatar circular con iniciales, usando el color de acento */}
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-fg"
            aria-label="Perfil de usuario"
          >
            {userInitials}
          </div>
        </div>
      </div>
    </header>
  )
}
