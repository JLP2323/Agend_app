// PublicCatalogPage.jsx — PANTALLA 1: Vitrina Principal y Selección (/b/:slug).
// Layout Widescreen de 3 Columnas (3-5-4 cols) con Navbar, Barra de Estado en vivo y Footer.
import { useParams } from 'react-router-dom'
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Moon, 
  Sun, 
  Lock, 
  ShieldCheck, 
  FileText,
  User
} from 'lucide-react'
import { useTheme } from '../../../context/ThemeContext'

// Componentes modulares de la Pantalla 1 creados en el Paso 2
import BusinessSidebarCard from '../components/BusinessSidebarCard'
import ServiceCatalogList from '../components/ServiceCatalogList'
import MonthlyCalendarCard from '../components/MonthlyCalendarCard'
import LiveTimeSlotsCard from '../components/LiveTimeSlotsCard'
import BookingMiniSummary from '../components/BookingMiniSummary'

export default function PublicCatalogPage() {
  const { slug } = useParams()
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-canvas text-content flex flex-col justify-between">
      <div>
        {/* =========================================================================
            1. NAVBAR SUPERIOR: Logo AgendApp, Salón Lumina, GMT-5, Botón Consultar y Tema
            ========================================================================= */}
        <header className="sticky top-0 z-40 border-b border-surface-border bg-surface/85 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
            
            {/* Lado Izquierdo: Marca AgendApp + Píldora del Salón */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-fg shadow-sm">
                  <CalendarIcon size={20} />
                </div>
                <span className="text-base font-extrabold tracking-tight text-content">
                  AgendApp
                </span>
              </div>

              <div className="h-4 w-px bg-surface-border hidden sm:block" />

              <div className="hidden sm:flex items-center gap-2 rounded-full border border-surface-border bg-elevated px-3 py-1 text-xs font-semibold text-content-secondary">
                <span className="h-2 w-2 rounded-full bg-emerald-fg animate-pulse" />
                <span>SALÓN Lumina</span>
              </div>
            </div>

            {/* Lado Derecho: GMT-5 Guayaquil + Consultar mi reserva + Tema + Avatar */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden md:flex items-center gap-1.5 text-xs text-content-secondary font-medium">
                <Clock size={14} className="text-content-muted" />
                <span>GMT-5 · Guayaquil</span>
              </div>

              <button
                type="button"
                className="hidden sm:flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface px-3 py-1.5 text-xs font-semibold text-content-secondary hover:border-accent hover:text-content transition-colors cursor-pointer"
              >
                <FileText size={13} />
                <span>Consultar mi reserva</span>
              </button>

              {/* Botón selector de tema oscuro / claro */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Alternar tema"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-surface-border bg-surface text-content-secondary hover:border-accent hover:text-content transition-colors cursor-pointer"
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              {/* Avatar circular */}
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent border border-accent/20 cursor-pointer">
                <User size={18} />
              </div>
            </div>
          </div>
        </header>

        {/* =========================================================================
            2. SUB-BARRA INFORMATIVA DE ESTADO EN VIVO
            ========================================================================= */}
        <section className="border-b border-surface-border/70 bg-elevated/40 text-[11px] text-content-secondary">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="text-content-muted">📍</span>
              <span>Guayaquil / <strong className="text-content font-semibold">Salón Lumina</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-fg font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-fg" />
                Reserva Instantánea Activa
              </span>
            </div>

            <div className="flex items-center gap-3 text-content-muted">
              <span className="flex items-center gap-1 text-amber-fg font-medium">
                <Lock size={12} />
                Bloqueo de turnos en tiempo real (5%)
              </span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:flex items-center gap-1 text-emerald-fg font-medium">
                <ShieldCheck size={13} />
                Sin sobreventas
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. LAYOUT WIDESCREEN PRINCIPAL DE 3 COLUMNAS (12 Columnas Grid)
            ========================================================================= */}
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
            
            {/* COLUMNA IZQUIERDA (3 Columnas): Perfil del Salón, Horarios y Garantías */}
            <div className="lg:col-span-3">
              <BusinessSidebarCard />
            </div>

            {/* COLUMNA CENTRAL (5 Columnas): Catálogo, Buscador, Filtros y Acordeón Especialista */}
            <div className="lg:col-span-5">
              <ServiceCatalogList />
            </div>

            {/* COLUMNA DERECHA (4 Columnas): Calendario Mensual, Horarios y Resumen Flotante */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <MonthlyCalendarCard />
              <LiveTimeSlotsCard />
              <BookingMiniSummary />
            </div>

          </div>
        </main>
      </div>

      {/* =========================================================================
          4. FOOTER GENERAL
          ========================================================================= */}
      <footer className="border-t border-surface-border bg-surface py-5 text-xs text-content-muted">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-content">AgendApp</span>
            <span>•</span>
            <span>© 2026 AgendApp Technologies Inc. Todos los derechos reservados.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-fg font-medium">
              <ShieldCheck size={13} />
              Transacciones encriptadas de extremo a extremo
            </span>
            <span className="hover:underline cursor-pointer">Términos</span>
            <span className="hover:underline cursor-pointer">Privacidad</span>
            <span className="hover:underline cursor-pointer">Seguridad</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
