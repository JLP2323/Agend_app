// DepositPoliciesCard.jsx — Pantalla 2 (Columna izquierda, 7 cols): Explicación pedagógica
// de las 3 reglas del abono del 5% y checkbox obligatorio de términos y condiciones.
import { ShieldCheck, Check } from 'lucide-react'
import { useBookingFlow } from '../context/BookingFlowContext'
import { formatUSD } from '../../../utils/currency'

export default function DepositPoliciesCard() {
  const { pricing, acceptedPolicies, setAcceptedPolicies } = useBookingFlow()

  // Montos dinámicos o fallbacks con los valores de referencia ($1.00 y $19.00 USD)
  const depositStr = pricing ? formatUSD(pricing.deposit) : '$1.00 USD'
  const balanceStr = pricing ? formatUSD(pricing.balance) : '$19.00 USD'

  return (
    <div className="rounded-2xl border border-surface-border bg-surface p-5 sm:p-6 shadow-card">
      {/* 1. Encabezado con Escudo Verde */}
      <div className="flex items-center gap-3 pb-4 border-b border-surface-border/70">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-soft text-emerald-fg border border-emerald-line">
          <ShieldCheck size={22} />
        </div>
        <div>
          <h3 className="text-base font-bold text-content leading-tight">
            ¿Cómo funciona tu abono del 5%?
          </h3>
          <p className="text-xs font-semibold text-emerald-fg">
            Transparencia total para clientes y salones profesionales
          </p>
        </div>
      </div>

      {/* 2. Las 3 Tarjetas Explicativas Numeradas */}
      <div className="mt-4 flex flex-col gap-2.5">
        
        {/* Regla 1: Congelamiento de Turno */}
        <div className="flex items-start gap-3 rounded-xl border border-surface-border/80 bg-elevated/60 p-3.5">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface border border-surface-border text-xs font-extrabold text-content">
            1
          </span>
          <div className="text-xs">
            <h4 className="font-bold text-content">
              Congelamiento de turno sin sobreventas
            </h4>
            <p className="mt-1 leading-relaxed text-content-secondary">
              Hoy solo abonas el <strong className="text-content">5% ({depositStr})</strong> para garantizar tu asistencia y bloquear el horario exclusivo en la agenda del salón sin riesgo de que otra persona tome tu espacio.
            </p>
          </div>
        </div>

        {/* Regla 2: El 95% restante en el salón */}
        <div className="flex items-start gap-3 rounded-xl border border-surface-border/80 bg-elevated/60 p-3.5">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface border border-surface-border text-xs font-extrabold text-content">
            2
          </span>
          <div className="text-xs">
            <h4 className="font-bold text-content">
              El 95% restante se paga en el salón
            </h4>
            <p className="mt-1 leading-relaxed text-content-secondary">
              Los <strong className="text-content">{balanceStr} restantes</strong> los pagas cómodamente en recepción al finalizar tu servicio en Salón Lumina (aceptan Efectivo, Deuna, Tarjeta de Débito o Crédito).
            </p>
          </div>
        </div>

        {/* Regla 3: Reprogramación y Reembolso */}
        <div className="flex items-start gap-3 rounded-xl border border-surface-border/80 bg-elevated/60 p-3.5">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface border border-surface-border text-xs font-extrabold text-content">
            3
          </span>
          <div className="text-xs">
            <h4 className="font-bold text-content">
              Reprogramación flexible & 100% Reembolsable
            </h4>
            <p className="mt-1 leading-relaxed text-content-secondary">
              Reembolso total de tu abono o cambio de horario sin costo si cancelas o reprogramas con al menos <strong className="text-content">24 horas de anticipación</strong> directamente desde tu link de WhatsApp.
            </p>
          </div>
        </div>

      </div>

      {/* 3. Checkbox de Aceptación de Términos (Obligatorio para pagar) */}
      <div className="mt-4 pt-3 border-t border-surface-border/70">
        <label className="flex items-start gap-3 cursor-pointer select-none text-xs text-content-secondary">
          <div className="relative flex items-center mt-0.5">
            <input
              type="checkbox"
              checked={acceptedPolicies}
              onChange={(e) => setAcceptedPolicies(e.target.checked)}
              className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-surface-border bg-elevated transition-all checked:border-accent checked:bg-accent"
            />
            <Check 
              size={12} 
              strokeWidth={3} 
              className="pointer-events-none absolute left-0.5 top-0.5 text-accent-fg opacity-0 peer-checked:opacity-100" 
            />
          </div>
          <span className="leading-relaxed">
            He leído y acepto expresamente las{' '}
            <span className="text-accent underline hover:text-accent-hover font-semibold">
              políticas de reserva y abono del 5%
            </span>{' '}
            de Salón Lumina, garantizando el bloqueo de agenda.
          </span>
        </label>
      </div>
    </div>
  )
}
