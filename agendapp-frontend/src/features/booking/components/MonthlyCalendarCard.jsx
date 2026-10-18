// MonthlyCalendarCard.jsx — Columna derecha (4 cols): Calendario mensual interactivo
// estilo Windows/Desktop con puntos de disponibilidad y leyenda de estados.
import { useState } from 'react'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { useBookingFlow } from '../context/BookingFlowContext'

// Días de la semana abreviados
const WEEKDAYS = [
  { key: 'lu', label: 'Lu' },
  { key: 'ma', label: 'Ma' },
  { key: 'mi', label: 'Mi' },
  { key: 'ju', label: 'Ju' },
  { key: 'vi', label: 'Vi' },
  { key: 'sa', label: 'Sá' },
  { key: 'do', label: 'Do', isSunday: true },
]

// Días de Octubre 2026 configurados para el mockup
// Octubre 2026 inicia en Jueves (1). Días 28, 29, 30 son de Septiembre (mes anterior).
const CALENDAR_DAYS = [
  // Días previos de Septiembre
  { day: 28, isCurrentMonth: false, available: false, dateStr: '2026-09-28' },
  { day: 29, isCurrentMonth: false, available: false, dateStr: '2026-09-29' },
  { day: 30, isCurrentMonth: false, available: false, dateStr: '2026-09-30' },
  // Octubre 2026
  { day: 1, isCurrentMonth: true, available: true, dateStr: '2026-10-01' },
  { day: 2, isCurrentMonth: true, available: true, dateStr: '2026-10-02' },
  { day: 3, isCurrentMonth: true, available: true, dateStr: '2026-10-03' },
  { day: 4, isCurrentMonth: true, available: false, isSunday: true, dateStr: '2026-10-04' },

  { day: 5, isCurrentMonth: true, available: true, dateStr: '2026-10-05' },
  { day: 6, isCurrentMonth: true, available: true, dateStr: '2026-10-06' },
  { day: 7, isCurrentMonth: true, available: true, dateStr: '2026-10-07' },
  { day: 8, isCurrentMonth: true, available: true, dateStr: '2026-10-08' },
  { day: 9, isCurrentMonth: true, available: true, dateStr: '2026-10-09' },
  { day: 10, isCurrentMonth: true, available: true, dateStr: '2026-10-10' },
  { day: 11, isCurrentMonth: true, available: false, isSunday: true, dateStr: '2026-10-11' },

  { day: 12, isCurrentMonth: true, available: true, dateStr: '2026-10-12' },
  { day: 13, isCurrentMonth: true, available: true, dateStr: '2026-10-13' },
  { day: 14, isCurrentMonth: true, available: true, dateStr: '2026-10-14' },
  { day: 15, isCurrentMonth: true, available: true, dateStr: '2026-10-15' },
  { day: 16, isCurrentMonth: true, available: true, dateStr: '2026-10-16' },
  { day: 17, isCurrentMonth: true, available: true, dateStr: '2026-10-17' },
  { day: 18, isCurrentMonth: true, available: false, isSunday: true, dateStr: '2026-10-18' },

  { day: 19, isCurrentMonth: true, available: true, dateStr: '2026-10-19' },
  { day: 20, isCurrentMonth: true, available: true, dateStr: '2026-10-20' },
  { day: 21, isCurrentMonth: true, available: true, dateStr: '2026-10-21' },
  { day: 22, isCurrentMonth: true, available: true, dateStr: '2026-10-22' },
  { day: 23, isCurrentMonth: true, available: true, dateStr: '2026-10-23' },
  { day: 24, isCurrentMonth: true, available: true, isDefault: true, dateStr: '2026-10-24' }, // Sábado activo
  { day: 25, isCurrentMonth: true, available: false, isSunday: true, dateStr: '2026-10-25' },

  { day: 26, isCurrentMonth: true, available: true, dateStr: '2026-10-26' },
  { day: 27, isCurrentMonth: true, available: true, dateStr: '2026-10-27' },
  { day: 28, isCurrentMonth: true, available: true, dateStr: '2026-10-28' },
  { day: 29, isCurrentMonth: true, available: true, dateStr: '2026-10-29' },
  { day: 30, isCurrentMonth: true, available: true, dateStr: '2026-10-30' },
  { day: 31, isCurrentMonth: true, available: true, dateStr: '2026-10-31' },
  // Día posterior de Noviembre
  { day: 1, isCurrentMonth: false, available: false, dateStr: '2026-11-01' },
]

export default function MonthlyCalendarCard() {
  const { date: selectedDate, selectDate } = useBookingFlow()
  const [currentMonthName] = useState('Octubre 2026')

  // Si no hay fecha elegida en el context, el default del diseño es el 2026-10-24
  const activeDate = selectedDate || '2026-10-24'

  return (
    <div className="rounded-2xl border border-surface-border bg-surface p-4 shadow-card">
      {/* 1. Cabecera del Mes con Flechas */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <CalendarIcon size={16} className="text-accent" />
          <h3 className="text-sm font-bold text-content">
            {currentMonthName}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-surface-border bg-elevated text-content-secondary hover:border-accent hover:text-content transition-colors cursor-pointer"
            aria-label="Mes anterior"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-surface-border bg-elevated text-content-secondary hover:border-accent hover:text-content transition-colors cursor-pointer"
            aria-label="Mes siguiente"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 2. Días de la Semana (Lu, Ma, Mi...) */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-content-muted border-t border-surface-border/60 pt-2.5 pb-1">
        {WEEKDAYS.map((wd) => (
          <div key={wd.key} className={wd.isSunday ? 'text-danger-fg' : ''}>
            {wd.label}
          </div>
        ))}
      </div>

      {/* 3. Cuadrícula de Números del Calendario */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {CALENDAR_DAYS.map((item, idx) => {
          const isSelected = activeDate === item.dateStr
          const isClickable = item.isCurrentMonth && item.available

          return (
            <button
              key={`${item.dateStr}-${idx}`}
              type="button"
              disabled={!isClickable}
              onClick={() => selectDate(item.dateStr)}
              className={[
                'relative flex h-8 w-full flex-col items-center justify-center rounded-xl text-xs font-semibold transition-all',
                // Día Seleccionado (Lavanda / Acento destacado como el 24 en el diseño)
                isSelected
                  ? 'bg-accent text-accent-fg font-extrabold shadow-sm scale-105 z-10 cursor-pointer'
                  : isClickable
                  ? 'text-content hover:bg-elevated hover:text-accent cursor-pointer'
                  : item.isCurrentMonth
                  ? 'text-content-muted/60 cursor-not-allowed'
                  : 'text-content-muted/30 cursor-not-allowed', // Fuera de mes
              ].join(' ')}
            >
              <span>{item.day < 10 && item.isCurrentMonth ? `0${item.day}` : item.day}</span>

              {/* Punto Verde de Disponibilidad debajo del número */}
              {item.available && !isSelected && item.isCurrentMonth && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-emerald-fg" />
              )}
            </button>
          )
        })}
      </div>

      {/* 4. Leyenda de Estados */}
      <div className="mt-3.5 flex items-center justify-between border-t border-surface-border/70 pt-3 text-[11px] text-content-secondary">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-fg" />
          <span>Disponible</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-semibold text-content">Seleccionado</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-content-muted/40" />
          <span className="text-content-muted">Agotado</span>
        </div>
      </div>
    </div>
  )
}
