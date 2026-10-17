// useBookingState.js — Estado centralizado de la reserva (servicio, profesional, fecha, hora).
import { useCallback, useMemo, useState } from 'react'
import { calculateDeposit } from '../../../utils/currency'   // Fase 2: abono 5% / saldo 95%
import useCountdownTimer from './useCountdownTimer'          // reloj de 10 minutos

const LOCK_SECONDS = 600 // duración del bloqueo temporal de un turno (10 min)

export default function useBookingState() {
  // --- Selecciones del usuario (un estado por cada paso) ---
  const [service, setService] = useState(null) // Paso 1: { id, name, price, ... }
  const [staff, setStaff] = useState(null)     // Paso 2: { id, name, role }
  const [date, setDate] = useState(null)       // Paso 3: "2026-10-24"
  const [time, setTime] = useState(null)       // Paso 3: "03:00 PM" (turno bloqueado)

  // Cuando el reloj llega a 00:00 liberamos el turno automáticamente.
  const handleExpire = useCallback(() => setTime(null), [])
  const timer = useCountdownTimer(LOCK_SECONDS, handleExpire)
  // Extraemos start/stop (son estables gracias a useCallback) para usarlos
  // como dependencias de los callbacks sin depender del objeto timer completo.
  const { start: startTimer, stop: stopTimer } = timer

  // --- Acciones ---
  const selectService = useCallback((value) => setService(value), [])

  // Cambiar de día o de profesional invalida el turno elegido,
  // porque la disponibilidad es distinta. Liberamos y paramos el reloj.
  const selectStaffAndReset = useCallback(
    (value) => {
      setStaff(value)
      setTime(null)
      stopTimer()
    },
    [stopTimer],
  )

  const selectDate = useCallback(
    (value) => {
      setDate(value)
      setTime(null)
      stopTimer()
    },
    [stopTimer],
  )

  // Elegir una hora = bloquear el turno y arrancar el reloj de 10 minutos.
  const selectTime = useCallback(
    (value) => {
      setTime(value)
      startTimer() // si ya corría, lo reinicia con el nuevo turno
    },
    [startTimer],
  )

  // Cancelar la selección de hora manualmente
  const clearSlot = useCallback(() => {
    setTime(null)
    stopTimer()
  }, [stopTimer])

  // Reinicia todo (por ejemplo, tras pagar con éxito)
  const resetBooking = useCallback(() => {
    setService(null)
    setStaff(null)
    setDate(null)
    setTime(null)
    stopTimer()
  }, [stopTimer])

  // --- Datos derivados (se calculan, NO se guardan en estado) ---
  // Si guardáramos el abono en un useState tendríamos dos fuentes de verdad
  // que pueden desincronizarse. Derivarlo desde el servicio lo evita.
  const pricing = useMemo(
    () => (service ? calculateDeposit(service.price) : null),
    [service],
  )

  // Todo lo necesario para poder pagar: los 4 pasos completos y el turno vigente.
  const canCheckout = Boolean(service && staff && date && time)

  return {
    // Selecciones
    service,
    staff,
    date,
    time,
    // Acciones
    selectService,
    selectStaff: selectStaffAndReset,
    selectDate,
    selectTime,
    clearSlot,
    resetBooking,
    // Derivados
    pricing,      // { total, deposit, balance } o null
    canCheckout,
    // Reloj (formatted, isRunning, isExpired, secondsLeft)
    timer,
  }
}
