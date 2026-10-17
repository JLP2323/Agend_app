// SlotLockBanner.jsx — Alerta ámbar con la cuenta regresiva de la reserva temporal.
import { AlertTriangle, Hourglass } from 'lucide-react'

export default function SlotLockBanner({
  formatted,        // texto "09:33" que entrega useCountdownTimer
  secondsLeft = 0,  // segundos restantes (para el aviso de urgencia)
  isRunning = false, // true mientras el turno está bloqueado
  isExpired = false, // true cuando el reloj llegó a 00:00
}) {
  // Sin reloj activo ni expirado no hay nada que mostrar.
  if (!isRunning && !isExpired) return null

  // Último minuto: la alerta pulsa para llamar la atención.
  const isUrgent = isRunning && secondsLeft <= 60

  return (
    <div
      // role="timer" es un temporizador: NO anuncia cada cambio a lectores de pantalla
      // (a diferencia de aria-live), así no leen "09:32, 09:31..." sin parar.
      role="timer"
      className={[
        'flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm',
        'border-amber-line bg-amber-soft text-amber-fg',
        isUrgent ? 'animate-pulse' : '',
      ].join(' ')}
    >
      {isExpired ? (
        <>
          <AlertTriangle size={20} className="shrink-0" />
          <p className="font-medium">
            Tu reserva temporal expiró. Elige un horario nuevamente para continuar.
          </p>
        </>
      ) : (
        <>
          <Hourglass size={20} className="shrink-0" />
          <p className="font-medium">
            Tienes{' '}
            {/* tabular-nums: los dígitos tienen el mismo ancho y el texto no "baila" */}
            <span className="font-bold tabular-nums">{formatted}</span>{' '}
            minutos para confirmar con tu abono del 5%
          </p>
        </>
      )}
    </div>
  )
}
