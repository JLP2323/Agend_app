// BookingMiniSummary.jsx — Columna derecha (4 cols): Tarjeta resumen con desglose
// del 5%, garantía de reembolso y botón que navega a la Pantalla 2 (Checkout).
import { User, Calendar, ArrowRight, ShieldCheck } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBookingFlow } from '../context/BookingFlowContext'
import { formatUSD } from '../../../utils/currency'

export default function BookingMiniSummary() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const businessSlug = slug || 'salon-lumina'

  // Consumimos las selecciones y cálculos del contexto global
  const { 
    service, 
    staff, 
    date, 
    time, 
    pricing,
    canCheckout 
  } = useBookingFlow()

  // Datos para renderizar (usa las selecciones activas o los datos por defecto de Salón Lumina)
  const currentService = service || { name: 'Corte & Estilo Signature', price: 20 }
  const currentStaff = staff || { name: 'Ana R.' }
  const currentTime = time || '04:30 PM'
  const currentDate = date || 'Sáb, 24 Oct'
  const currentPricing = pricing || { total: 20, deposit: 1, balance: 19 }

  const handleContinue = () => {
    // Navega a la ruta de Checkout (Pantalla 2) pasando el slug del negocio
    navigate(`/b/${businessSlug}/checkout`)
  }

  return (
    <div className="rounded-2xl border border-surface-border bg-surface p-4 shadow-card">
      {/* 1. Encabezado en mayúsculas pequeñas */}
      <span className="text-[10px] font-bold tracking-wider uppercase text-content-muted">
        Resumen de Cita
      </span>

      {/* 2. Servicio y Precio Total */}
      <div className="mt-1.5 flex items-start justify-between gap-2">
        <h4 className="text-sm font-bold text-content leading-snug">
          {currentService.name}
        </h4>
        <span className="text-sm font-extrabold text-content shrink-0">
          ${currentService.price.toFixed(2)} USD
        </span>
      </div>

      {/* 3. Profesional Asignado + Fecha y Hora */}
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-content-secondary">
        <span className="flex items-center gap-1 font-medium">
          <User size={13} className="text-accent" />
          Con <strong className="text-content font-semibold">{currentStaff.name}</strong>
        </span>
        <span className="text-content-muted">•</span>
        <span className="flex items-center gap-1 font-medium">
          <Calendar size={13} className="text-accent" />
          {currentDate} ({currentTime})
        </span>
      </div>

      {/* 4. Abono Requerido del 5% */}
      <div className="mt-4 flex items-center justify-between border-t border-surface-border/70 pt-3 text-xs">
        <span className="text-content-secondary font-medium">
          Abono reserva requerido (5%):
        </span>
        <span className="text-base font-extrabold text-emerald-fg">
          {formatUSD(currentPricing.deposit)}
        </span>
      </div>

      {/* 5. Botón de Acción Principal hacia la Pantalla 2 */}
      <button
        type="button"
        onClick={handleContinue}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-xs sm:text-sm font-extrabold text-accent-fg shadow-card transition-all duration-200 hover:bg-accent-hover active:scale-[0.98] cursor-pointer"
      >
        <span>
          Continuar al Resumen y Pago del 5% ({formatUSD(currentPricing.deposit)})
        </span>
        <ArrowRight size={16} />
      </button>

      {/* 6. Nota de Garantía y Transparencia */}
      <div className="mt-3.5 flex items-start gap-2 rounded-xl bg-elevated/60 p-2.5 text-[11px] leading-relaxed text-content-secondary border border-surface-border/60">
        <ShieldCheck size={16} className="text-emerald-fg shrink-0 mt-0.5" />
        <p>
          No te cobraremos los <strong className="text-content">{formatUSD(currentPricing.balance)}</strong> restantes hasta que finalice tu servicio en el local. Si cancelas con 24h de antelación, tu abono se reembolsa de forma íntegra.
        </p>
      </div>
    </div>
  )
}
