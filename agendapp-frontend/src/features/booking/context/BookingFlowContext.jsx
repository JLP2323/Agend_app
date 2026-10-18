// BookingFlowContext.jsx — Estado compartido entre la Pantalla 1 (catálogo) y la Pantalla 2 (checkout).
import { createContext, useCallback, useContext, useState } from 'react'
import useBookingState from '../hooks/useBookingState' // Fase 4: servicio, staff, fecha, hora, 5% y reloj

const BookingFlowContext = createContext(null)

// Estado inicial del formulario de contacto (Pantalla 2).
const EMPTY_CONTACT = { fullName: '', whatsapp: '', email: '', notes: '' }

export function BookingFlowProvider({ children }) {
  // 1) Reutilizamos el hook de la Fase 4 en vez de reescribirlo.
  //    Al llamarlo AQUÍ (y no dentro de una página), el estado y el reloj de
  //    10 minutos sobreviven al cambiar de ruta: el Provider nunca se desmonta.
  const booking = useBookingState()
  const { resetBooking } = booking

  // 2) Estado nuevo, propio de la Pantalla 2.
  const [contact, setContact] = useState(EMPTY_CONTACT)          // datos del cliente
  const [paymentMethod, setPaymentMethod] = useState('stripe')   // 'stripe' | 'payphone' | 'deuna'
  const [acceptedPolicies, setAcceptedPolicies] = useState(false) // checkbox obligatorio

  // Actualiza un solo campo del contacto: updateContact('email', 'a@b.com')
  const updateContact = useCallback(
    (field, value) => setContact((prev) => ({ ...prev, [field]: value })),
    [],
  )

  // Reinicia TODO el flujo (tras pagar con éxito o al empezar de nuevo).
  const resetFlow = useCallback(() => {
    resetBooking() // limpia selecciones y detiene el reloj
    setContact(EMPTY_CONTACT)
    setPaymentMethod('stripe')
    setAcceptedPolicies(false)
  }, [resetBooking])

  // 3) Valor que verán los componentes: lo del hook + lo nuevo, en un solo objeto.
  //    No usamos useMemo porque `booking` cambia con cada tick del reloj de todas formas.
  const value = {
    ...booking, // service, staff, date, time, select*, clearSlot, pricing, canCheckout, timer
    contact,
    updateContact,
    paymentMethod,
    setPaymentMethod,
    acceptedPolicies,
    setAcceptedPolicies,
    resetFlow,
  }

  return <BookingFlowContext.Provider value={value}>{children}</BookingFlowContext.Provider>
}

// Hook de consumo: useBookingFlow() en cualquier componente de las 2 pantallas.
// eslint-disable-next-line react-refresh/only-export-components
export function useBookingFlow() {
  const ctx = useContext(BookingFlowContext)
  if (!ctx) throw new Error('useBookingFlow debe usarse dentro de <BookingFlowProvider>')
  return ctx
}
