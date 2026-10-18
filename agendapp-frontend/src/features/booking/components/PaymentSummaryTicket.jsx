// PaymentSummaryTicket.jsx — Pantalla 2 (Columna derecha, 5 cols): Ticket de resumen
// de cita, desglose del 5%, selector de pasarela (Stripe/Payphone/Deuna), inputs de tarjeta
// y botón principal de pago seguro con garantía express.
import { useState } from 'react'
import { 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  ArrowLeftRight, 
  Clock, 
  Calendar, 
  Star, 
  Info,
  ArrowRight
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useBookingFlow } from '../context/BookingFlowContext'
import { formatUSD } from '../../../utils/currency'

export default function PaymentSummaryTicket() {
  const navigate = useNavigate()
  const { 
    service, 
    staff, 
    date, 
    time, 
    pricing, 
    paymentMethod, 
    setPaymentMethod, 
    acceptedPolicies,
    resetFlow
  } = useBookingFlow()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Datos activos o fallbacks con los valores de Salón Lumina
  const currentService = service || { name: 'Corte & Estilo Signature', price: 20, duration: 45 }
  const currentStaff = staff || { 
    name: 'Ana R.', 
    role: 'Estilista Senior · Salón Lumina',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
  }
  const currentSlotTime = time || '04:30 PM'
  const currentSlotDate = date || 'Sáb, 24 Oct 2026'
  const currentPricing = pricing || { total: 20, deposit: 1, balance: 19 }

  const handlePay = () => {
    if (!acceptedPolicies) return

    setIsSubmitting(true)
    // Simula la llamada a la pasarela de pago (Stripe / Payphone / Deuna)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  const handleFinish = () => {
    resetFlow()
    navigate('/b/salon-lumina')
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Ticket de Resumen de Cita */}
      <div className="overflow-hidden rounded-2xl border border-surface-border bg-surface p-5 shadow-card">
        
        {/* Encabezado: Salón Lumina con miniatura y rating */}
        <div className="flex items-center justify-between pb-4 border-b border-surface-border/70">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-xl border border-surface-border bg-elevated shrink-0">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=120&q=80"
                alt="Salón Lumina"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-content leading-tight">
                Salón Lumina
              </h3>
              <p className="text-[11px] text-content-muted">
                Av. Samborondón km 3.5, Samborondón
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-content">
            <Star size={13} className="fill-amber-fg text-amber-fg" />
            <span>4.9</span>
          </div>
        </div>

        {/* Bloque: Servicio Agendado */}
        <div className="mt-4 pb-4 border-b border-surface-border/70">
          <div className="flex items-center justify-between text-[11px] text-content-muted font-bold tracking-wider uppercase">
            <span>Servicio Agendado</span>
            <span className="flex items-center gap-1 text-content-secondary font-semibold normal-case">
              <Clock size={12} />
              {currentService.duration || 45} min
            </span>
          </div>

          <h4 className="mt-1 text-sm font-extrabold text-content">
            {currentService.name}
          </h4>

          {/* Profesional asignado */}
          <div className="mt-2.5 flex items-center justify-between rounded-xl bg-elevated/60 p-2 border border-surface-border/60">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 overflow-hidden rounded-full border border-surface-border shrink-0">
                <img
                  src={currentStaff.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                  alt={currentStaff.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-[11px] leading-tight">
                <span className="font-bold text-content block">{currentStaff.name}</span>
                <span className="text-[10px] text-content-muted">{currentStaff.role || 'Estilista Senior · Salón Lumina'}</span>
              </div>
            </div>

            <CheckCircle2 size={16} className="text-emerald-fg mr-1" />
          </div>
        </div>

        {/* Bloque: Fecha y Hora con Insignia "Bloqueado" */}
        <div className="mt-4 pb-4 border-b border-surface-border/70">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-elevated text-accent border border-surface-border">
                <Calendar size={16} />
              </div>
              <div className="text-xs leading-tight">
                <span className="text-[10px] font-bold text-content-muted tracking-wider uppercase block">
                  Fecha & Hora
                </span>
                <span className="font-bold text-content mt-0.5 block">
                  {currentSlotDate} · {currentSlotTime}
                </span>
              </div>
            </div>

            <span className="flex items-center gap-1 rounded-full border border-emerald-line bg-emerald-soft px-2 py-0.5 text-[10px] font-bold text-emerald-fg">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-fg" />
              Bloqueado
            </span>
          </div>
        </div>

        {/* Desglose Financiero */}
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex justify-between text-content-secondary">
            <span>Valor Total del Servicio</span>
            <span className="font-bold text-content">${currentPricing.total.toFixed(2)} USD</span>
          </div>

          <div className="flex justify-between text-content-muted">
            <span className="flex items-center gap-1">
              Saldo pendiente en el local (95%)
              <Info size={12} className="cursor-pointer" />
            </span>
            <span>{formatUSD(currentPricing.balance)}</span>
          </div>

          <div className="mt-2 flex items-center justify-between border-t border-surface-border/80 pt-3">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-fg block">
                Total a pagar hoy (5%)
              </span>
              <span className="text-[10px] text-content-muted">
                Garantía Anti No-Show
              </span>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black text-emerald-fg tracking-tight">
                {formatUSD(currentPricing.deposit)}
              </span>
            </div>
          </div>
        </div>

        {/* Selector de Método de Abono */}
        <div className="mt-5 border-t border-surface-border/70 pt-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-content-muted block mb-2">
            Seleccionar método de abono
          </span>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod('stripe')}
              className={[
                'flex flex-col items-center justify-center gap-1 rounded-xl border p-2 text-center text-[11px] font-semibold transition-all cursor-pointer',
                paymentMethod === 'stripe'
                  ? 'border-accent bg-accent-soft text-accent ring-1 ring-accent'
                  : 'border-surface-border bg-elevated/60 text-content-secondary hover:text-content',
              ].join(' ')}
            >
              <CreditCard size={15} />
              <span>Tarjeta / Stripe</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('payphone')}
              className={[
                'flex flex-col items-center justify-center gap-1 rounded-xl border p-2 text-center text-[11px] font-semibold transition-all cursor-pointer',
                paymentMethod === 'payphone'
                  ? 'border-accent bg-accent-soft text-accent ring-1 ring-accent'
                  : 'border-surface-border bg-elevated/60 text-content-secondary hover:text-content',
              ].join(' ')}
            >
              <Smartphone size={15} />
              <span>Payphone</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('deuna')}
              className={[
                'flex flex-col items-center justify-center gap-1 rounded-xl border p-2 text-center text-[11px] font-semibold transition-all cursor-pointer',
                paymentMethod === 'deuna'
                  ? 'border-accent bg-accent-soft text-accent ring-1 ring-accent'
                  : 'border-surface-border bg-elevated/60 text-content-secondary hover:text-content',
              ].join(' ')}
            >
              <ArrowLeftRight size={15} />
              <span>Deuna / Transf</span>
            </button>
          </div>

          {/* Formulario de Tarjeta (Stripe Mock) */}
          {paymentMethod === 'stripe' && (
            <div className="mt-3.5 space-y-2 text-xs">
              <div className="flex justify-between items-center text-[11px] text-content-secondary font-semibold">
                <span>Tarjeta Débito o Crédito</span>
                <span className="text-[10px] text-content-muted tracking-wider">VISA MC</span>
              </div>

              <div className="rounded-xl border border-surface-border bg-elevated/70 px-3 py-2 text-sm text-content font-mono tracking-wider focus-within:border-accent">
                <input
                  type="text"
                  placeholder="Número de Tarjeta: •••• •••• •••• 4242"
                  className="w-full bg-transparent outline-none placeholder:text-content-muted/60"
                  defaultValue="•••• •••• •••• 4242"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="MM / AA"
                  className="rounded-xl border border-surface-border bg-elevated/70 px-3 py-2 text-xs text-content font-mono outline-none placeholder:text-content-muted/60 focus:border-accent text-center"
                  defaultValue="12/28"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="rounded-xl border border-surface-border bg-elevated/70 px-3 py-2 text-xs text-content font-mono outline-none placeholder:text-content-muted/60 focus:border-accent text-center"
                  defaultValue="123"
                />
              </div>
            </div>
          )}

          {/* Botón Principal de Pago */}
          <button
            type="button"
            disabled={!acceptedPolicies || isSubmitting}
            onClick={handlePay}
            className={[
              'mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold shadow-card transition-all duration-200 cursor-pointer',
              acceptedPolicies && !isSubmitting
                ? 'bg-accent text-accent-fg hover:bg-accent-hover active:scale-[0.98]'
                : 'bg-elevated text-content-muted border border-surface-border cursor-not-allowed opacity-60',
            ].join(' ')}
          >
            {isSubmitting ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <>
                <Lock size={16} />
                <span>Pagar {formatUSD(currentPricing.deposit)} y Confirmar Turno</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

          {/* Sellos de Seguridad */}
          <div className="mt-3 flex items-center justify-center gap-3 text-[10px] text-content-muted">
            <span className="flex items-center gap-1 text-emerald-fg font-medium">
              <ShieldCheck size={12} /> Stripe SSL 256-bit
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-fg font-medium">
              <CheckCircle2 size={12} /> Payphone Verificado
            </span>
          </div>

          <p className="mt-1 text-center text-[10px] leading-tight text-content-muted">
            No se te cobrará ningún cargo recurrente ni valor adicional sin tu consentimiento previo.
          </p>
        </div>
      </div>

      {/* 2. Tarjeta Inferior: Garantía de Reembolso Express */}
      <div className="rounded-2xl border border-surface-border bg-surface p-4 shadow-card flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-soft text-emerald-fg border border-emerald-line">
          <ShieldCheck size={18} />
        </div>
        <div className="text-xs">
          <h5 className="font-bold text-content">Garantía de Reembolso Express</h5>
          <p className="mt-0.5 text-content-secondary leading-relaxed">
            Devolución automática de los {formatUSD(currentPricing.deposit)} si cancelas con 24 horas de antelación.
          </p>
        </div>
      </div>

      {/* Modal / Overlay de Éxito al Confirmar Pago */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-emerald-line bg-surface p-6 text-center shadow-2xl animate-in fade-in zoom-in-95">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-soft text-emerald-fg mb-4">
              <CheckCircle2 size={32} />
            </div>

            <h3 className="text-xl font-bold text-content">¡Reserva y Abono Confirmados!</h3>
            <p className="mt-2 text-xs text-content-secondary leading-relaxed">
              Tu turno de <strong className="text-content">{currentService.name}</strong> para el{' '}
              <strong className="text-content">{currentSlotDate} a las {currentSlotTime}</strong> con{' '}
              <strong className="text-content">{currentStaff.name}</strong> ha quedado bloqueado exitosamente.
            </p>

            <div className="mt-4 rounded-xl bg-elevated p-3 text-xs text-left text-content-secondary border border-surface-border space-y-1">
              <div className="flex justify-between">
                <span>Abono cobrado (5%):</span>
                <strong className="text-emerald-fg">{formatUSD(currentPricing.deposit)}</strong>
              </div>
              <div className="flex justify-between">
                <span>Saldo en salón (95%):</span>
                <strong className="text-content">{formatUSD(currentPricing.balance)}</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={handleFinish}
              className="mt-5 w-full rounded-xl bg-accent py-3 text-xs font-bold text-accent-fg shadow-card hover:bg-accent-hover transition-colors cursor-pointer"
            >
              Volver a la vitrina de Salón Lumina
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
