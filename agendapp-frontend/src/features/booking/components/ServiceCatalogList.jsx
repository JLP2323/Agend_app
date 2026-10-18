// ServiceCatalogList.jsx — Columna central (5 cols): Buscador, filtros por categoría,
// tarjetas de servicio y acordeón expandible para selección de especialista (Paso 2/3).
import { useState } from 'react'
import { 
  Search, 
  Clock, 
  Flame, 
  Users, 
  Zap, 
  Check, 
  ChevronDown, 
  Star,
  Lock
} from 'lucide-react'
import Badge from '../../../components/ui/Badge'
import { useBookingFlow } from '../context/BookingFlowContext'
import { calculateDeposit, formatUSD } from '../../../utils/currency'

// Categorías del catálogo
const CATEGORIES = [
  { id: 'todos', name: 'Todos (12)' },
  { id: 'cabello', name: 'Cabello' },
  { id: 'facial', name: 'Facial' },
  { id: 'spa', name: 'Spa & Masajes' },
  { id: 'unas', name: 'Uñas' },
]

// Catálogo de Servicios con miniaturas y detalles de diseño
const CATALOG_SERVICES = [
  {
    id: 'corte',
    name: 'Corte & Estilo Signature',
    category: 'cabello',
    isHot: true,
    description: 'Lavado botánico purificante, corte de diseño con estilismo personalizado, brushing y acabado con serum de argán.',
    duration: 45,
    price: 20,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'facial',
    name: 'Tratamiento Facial Glow',
    category: 'facial',
    isHot: false,
    description: 'Limpieza profunda con microdermoabrasión de punta de diamante y mascarilla intensiva de ácido hialurónico.',
    duration: 60,
    price: 50,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'color',
    name: 'Color & Balayage Premium',
    category: 'cabello',
    isHot: false,
    description: 'Decoloración protectora plex, matización personalizada y tratamiento sellador de brillo espejo.',
    duration: 150,
    price: 80,
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=300&q=80',
  },
]

// Lista de Especialistas para el acordeón Paso 2/3
const STAFF_OPTIONS = [
  {
    id: 'any',
    name: 'Cualquiera',
    role: 'Más rápido',
    badge: 'Sin espera',
    rating: null,
    isAny: true,
  },
  {
    id: 'ana',
    name: 'Ana R.',
    role: 'Estilista Senior',
    badge: 'Disponible hoy',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'carlos',
    name: 'Carlos M.',
    role: 'Colorista Master',
    badge: 'Turno: 04:30 PM',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
]

export default function ServiceCatalogList() {
  // Consumimos el contexto global de reserva creado en el Paso 1
  const { service: selectedService, selectService, staff: selectedStaff, selectStaff } = useBookingFlow()

  const [activeCategory, setActiveCategory] = useState('todos')
  const [searchQuery, setSearchQuery] = useState('')

  // Filtrado reactivo por texto y categoría
  const filteredServices = CATALOG_SERVICES.filter((item) => {
    const matchesCategory = activeCategory === 'todos' || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Encabezado del Catálogo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold tracking-tight text-content">
            Catálogo de Servicios
          </h2>
          <span className="rounded-md bg-elevated px-2 py-0.5 text-xs font-semibold text-content-secondary border border-surface-border">
            12 activos
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-fg">
          <span className="h-2 w-2 rounded-full bg-emerald-fg animate-pulse" />
          <span>Cupos actualizados</span>
        </div>
      </div>

      {/* 2. Buscador con atajo visual ⌘K */}
      <div className="relative flex items-center">
        <Search size={16} className="absolute left-3.5 text-content-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar servicio o tratamiento..."
          className="w-full rounded-xl border border-surface-border bg-surface py-2.5 pl-10 pr-12 text-sm text-content placeholder:text-content-muted outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <kbd className="absolute right-3 rounded border border-surface-border bg-elevated px-1.5 py-0.5 text-[10px] font-semibold text-content-muted">
          ⌘K
        </kbd>
      </div>

      {/* 3. Filtros por Categoría */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={[
                'whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer',
                isActive
                  ? 'bg-accent text-accent-fg font-semibold shadow-xs'
                  : 'border border-surface-border bg-surface text-content-secondary hover:border-elevated-border hover:text-content',
              ].join(' ')}
            >
              {cat.name}
            </button>
          )
        })}
      </div>

      {/* 4. Lista de Tarjetas de Servicio */}
      <div className="flex flex-col gap-3">
        {filteredServices.map((serviceItem) => {
          const isSelected = selectedService?.id === serviceItem.id
          const { deposit } = calculateDeposit(serviceItem.price)

          return (
            <div
              key={serviceItem.id}
              className={[
                'overflow-hidden rounded-2xl border transition-all duration-200',
                isSelected
                  ? 'border-accent bg-surface ring-1 ring-accent shadow-card'
                  : 'border-surface-border bg-surface hover:border-elevated-border',
              ].join(' ')}
            >
              {/* Tarjeta Principal del Servicio */}
              <div 
                onClick={() => selectService(serviceItem)}
                className="flex cursor-pointer gap-4 p-4"
              >
                {/* Miniatura del Servicio */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-elevated">
                  <img
                    src={serviceItem.image}
                    alt={serviceItem.name}
                    className="h-full w-full object-cover"
                  />
                  {serviceItem.isHot && (
                    <span className="absolute top-1 left-1 flex items-center gap-0.5 rounded bg-amber-500/90 px-1 py-0.5 text-[9px] font-black uppercase tracking-wider text-black shadow-xs">
                      <Flame size={10} className="fill-black" />
                      HOT
                    </span>
                  )}
                </div>

                {/* Contenido Central: Título, Descripción y Metadatos */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-content leading-tight">
                        {serviceItem.name}
                      </h3>

                      {/* Estado Seleccionado / Seleccionar */}
                      <div className="shrink-0">
                        {isSelected ? (
                          <span className="flex items-center gap-1 text-xs font-bold text-accent">
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-fg">
                              <Check size={11} strokeWidth={3} />
                            </span>
                            Seleccionado
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-content-muted hover:text-content">
                            Seleccionar ○
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="mt-1 line-clamp-2 text-xs text-content-secondary leading-relaxed">
                      {serviceItem.description}
                    </p>
                  </div>

                  {/* Fila de Precio, Duración y Abono */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-content-muted font-medium">
                      <Clock size={13} />
                      {serviceItem.duration} min
                    </span>

                    <span className="text-sm font-extrabold text-content">
                      ${serviceItem.price.toFixed(2)} <span className="text-[10px] font-medium text-content-muted">USD</span>
                    </span>

                    <Badge variant="emerald" size="sm" className="normal-case font-semibold">
                      Abono 5%: {formatUSD(deposit)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* 5. ACORDEÓN INTEGRADO: Elige tu Especialista (Paso 2/3)
                  Se expande automáticamente cuando este servicio está seleccionado */}
              {isSelected && (
                <div className="border-t border-surface-border bg-elevated/60 p-4 transition-all">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Users size={15} className="text-accent" />
                        <h4 className="text-xs font-bold text-content">
                          Elige tu Especialista para este servicio
                        </h4>
                        <span className="rounded bg-accent-soft px-1.5 py-0.5 text-[10px] font-bold text-accent">
                          Paso 2/3
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-content-muted">
                        Profesional asignado para el horario de tu cita
                      </p>
                    </div>
                  </div>

                  {/* Cuadrícula de 3 Especialistas */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {STAFF_OPTIONS.map((staff) => {
                      const isStaffSelected = selectedStaff?.id === staff.id

                      return (
                        <button
                          key={staff.id}
                          type="button"
                          onClick={() => selectStaff(staff)}
                          className={[
                            'relative flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all cursor-pointer',
                            isStaffSelected
                              ? 'border-accent bg-surface shadow-xs ring-1 ring-accent'
                              : 'border-surface-border bg-surface/70 hover:border-elevated-border hover:bg-surface',
                          ].join(' ')}
                        >
                          {/* Check de seleccionado */}
                          {isStaffSelected && (
                            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-fg">
                              <Check size={10} strokeWidth={3} />
                            </span>
                          )}

                          {/* Avatar / Icono */}
                          {staff.isAny ? (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-elevated text-accent mb-1.5">
                              <Zap size={18} />
                            </div>
                          ) : (
                            <div className="h-10 w-10 overflow-hidden rounded-full border border-surface-border mb-1.5">
                              <img src={staff.image} alt={staff.name} className="h-full w-full object-cover" />
                            </div>
                          )}

                          <span className="text-xs font-bold text-content leading-tight">
                            {staff.name}
                          </span>

                          <span className="text-[10px] text-content-muted">
                            {staff.role} {staff.rating && `• ★ ${staff.rating}`}
                          </span>

                          {/* Píldora de Disponibilidad */}
                          <span
                            className={[
                              'mt-2 rounded-full px-2 py-0.5 text-[9px] font-semibold tracking-wide',
                              staff.isAny
                                ? 'bg-elevated text-content-secondary'
                                : staff.badge.includes('Turno')
                                ? 'bg-amber-soft text-amber-fg border border-amber-line'
                                : 'bg-emerald-soft text-emerald-fg border border-emerald-line',
                            ].join(' ')}
                          >
                            {staff.badge}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Barra inferior de confirmación del profesional */}
                  <div className="mt-3 flex items-center justify-between border-t border-surface-border/80 pt-2.5 text-xs">
                    <span className="flex items-center gap-1.5 text-content-secondary text-[11px]">
                      <Lock size={12} className="text-emerald-fg" />
                      Especialista asignada: <strong className="text-content">{selectedStaff?.name || 'Por elegir'}</strong>
                    </span>

                    <button 
                      type="button"
                      className="flex items-center gap-1 font-semibold text-accent text-xs hover:underline cursor-pointer"
                    >
                      <span>Confirmar profesional</span>
                      <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
