// useCountdownTimer.js — Reloj regresivo para la reserva temporal de un turno.
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * @param {number} durationSeconds  Duración total (600 = 10 minutos).
 * @param {() => void} onExpire     Función a ejecutar cuando llega a 00:00
 *                                  (ej. liberar el turno bloqueado).
 */
export default function useCountdownTimer(durationSeconds = 600, onExpire) {
  // deadline = marca de tiempo (ms) en que expira. null => reloj apagado.
  const [deadline, setDeadline] = useState(null)
  // now = "hora actual" que se refresca cada 250ms para forzar el re-render.
  const [now, setNow] = useState(() => Date.now())

  // Guardamos onExpire en un ref para tener siempre la última versión sin
  // tener que reiniciar el intervalo cuando el padre cambia la función.
  const onExpireRef = useRef(onExpire)
  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  // Intervalo: solo existe mientras haya un deadline activo.
  useEffect(() => {
    if (deadline === null) return
    const id = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(id) // limpieza: evita fugas de memoria
  }, [deadline])

  // Segundos restantes. Calculados con la hora real (deadline - now) y no
  // restando 1 por tick: así no se atrasa si la pestaña queda en segundo plano.
  const secondsLeft =
    deadline === null
      ? durationSeconds
      : Math.max(0, Math.ceil((deadline - now) / 1000))

  const isExpired = deadline !== null && secondsLeft === 0
  const isRunning = deadline !== null && !isExpired

  // Cuando expira, avisamos una sola vez al padre.
  useEffect(() => {
    if (isExpired) onExpireRef.current?.()
  }, [isExpired])

  // Inicia (o reinicia) el reloj: se llama al bloquear un turno.
  const start = useCallback(() => {
    const current = Date.now()
    setNow(current) // evita mostrar un valor viejo en el primer render
    setDeadline(current + durationSeconds * 1000)
  }, [durationSeconds])

  // Apaga el reloj: se llama al cancelar la selección o completar el pago.
  const stop = useCallback(() => setDeadline(null), [])

  // Formato MM:SS con ceros a la izquierda -> "09:33"
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const seconds = String(secondsLeft % 60).padStart(2, '0')

  return {
    secondsLeft,                  // número crudo
    formatted: `${minutes}:${seconds}`, // texto para mostrar en pantalla
    isRunning,                    // true mientras corre
    isExpired,                    // true al llegar a 00:00
    start,
    stop,
  }
}
