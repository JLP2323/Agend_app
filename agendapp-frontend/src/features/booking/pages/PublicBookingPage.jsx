// PublicBookingPage.jsx — Ensambla todo el portal público de reservas (Salón Lumina).
import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

import PublicNavbar from '../../../components/layout/PublicNavbar'
import Button from '../../../components/ui/Button'
import BusinessHero from '../components/BusinessHero'
import ServiceSelectList from '../components/ServiceSelectList'
import StaffCarousel from '../components/StaffCarousel'
import LiveSchedulePicker from '../components/LiveSchedulePicker'
import SlotLockBanner from '../components/SlotLockBanner'
import CheckoutFormCard from '../components/CheckoutFormCard'
import useBookingState from '../hooks/useBookingState'

// ============================================================================
// DATOS DE PRUEBA (mock). En fases futuras vendrán del backend (API + Socket.io).
// Los componentes no cambian: solo cambiará de dónde salen estos datos.
// ============================================================================
const SERVICES = [
  { id: 'corte', name: 'Corte & Estilo Signature', description: 'Corte personalizado con lavado y peinado.', duration: 45, price: 20 },
  { id: 'facial', name: 'Tratamiento Facial Glow', description: 'Limpieza profunda e hidratación luminosa.', duration: 60, price: 50 },
  { id: 'color', name: 'Color & Balayage Premium', description: 'Coloración a medida con técnica balayage.', duration: 150, price: 80 },
]

const STAFF = [
  { id: 'any', name: 'Cualquiera', role: 'Más rápido' },
  { id: 'ana', name: 'Ana R.', role: 'Estilista Senior' },
  { id: 'carlos', name: 'Carlos M.', role: 'Colorista Master' },
]

// ids simples: el calendario real llegará con el backend
const DAYS = [
  { id: 'jue-24', label: 'Jue', dayNumber: 24, closed: false },
  { id: 'vie-25', label: 'Vie', dayNumber: 25, closed: false },
  { id: 'sab-26', label: 'Sáb', dayNumber: 26, closed: false },
  { id: 'dom-27', label: 'Dom', dayNumber: 27, closed: true },
]

// Mismas horas para todos los días (mock). Cubre los estados free / busy / locked.
const SLOTS = [
  { time: '10:00 AM', status: 'busy' },
  { time: '11:30 AM', status: 'free' },
  { time: '01:30 PM', status: 'locked' },
  { time: '03:00 PM', status: 'free' },
  { time: '04:30 PM', status: 'free' },
  { time: '06:00 PM', status: 'busy' },
]

// Simula una petición de red (reemplazar por fetch/axios al backend más adelante)
const fakePayment = () => new Promise((resolve) => setTimeout(resolve, 1500))

export default function PublicBookingPage() {
  // UN solo llamado al hook: todos los componentes comparten este estado.
  const booking = useBookingState()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmation, setConfirmation] = useState(null) // resumen tras pagar

  const handleSubmit = async (customer) => {
    setIsSubmitting(true)
    await fakePayment()
    console.log('Reserva enviada:', { ...customer, booking: { service: booking.service, staff: booking.staff, date: booking.date, time: booking.time } })

    // Guardamos el resumen ANTES de reiniciar, porque resetBooking lo borra.
    setConfirmation({
      name: customer.fullName,
      service: booking.service.name,
      staff: booking.staff.name,
      date: booking.date,
      time: booking.time,
    })
    booking.resetBooking() // limpia selecciones y detiene el reloj
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-svh bg-canvas">
      <PublicNavbar businessName="KALLISTO STUDIO" subtitle="Booking Checkout" />

      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6">
        <BusinessHero />

        {confirmation ? (
          // ---------- Pantalla de éxito ----------
          <section className="rounded-2xl border border-emerald-line bg-emerald-soft p-8 text-center shadow-card">
            <CheckCircle2 size={48} className="mx-auto text-emerald-fg" />
            <h2 className="mt-3 text-2xl font-bold text-content">¡Cita confirmada!</h2>
            <p className="mt-2 text-content-secondary">
              {confirmation.name}, te esperamos para <strong>{confirmation.service}</strong> con{' '}
              {confirmation.staff} ({confirmation.date}, {confirmation.time}).
            </p>
            <Button className="mt-6" onClick={() => setConfirmation(null)}>
              Hacer otra reserva
            </Button>
          </section>
        ) : (
          // ---------- Flujo de reserva: 2 columnas en pantallas grandes ----------
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Columna izquierda: pasos 1, 2 y 3 */}
            <div className="flex flex-col gap-8">
              <ServiceSelectList
                services={SERVICES}
                selectedService={booking.service}
                onSelect={booking.selectService}
              />
              <StaffCarousel
                staffList={STAFF}
                selectedStaff={booking.staff}
                onSelect={booking.selectStaff}
              />
              <LiveSchedulePicker
                days={DAYS}
                slots={SLOTS}
                selectedDate={booking.date}
                selectedTime={booking.time}
                onSelectDate={booking.selectDate}
                onSelectTime={booking.selectTime}
              />
            </div>

            {/* Columna derecha: banner + checkout. sticky: acompaña el scroll en desktop */}
            <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
              {/* {...booking.timer} pasa formatted, secondsLeft, isRunning e isExpired */}
              <SlotLockBanner {...booking.timer} />
              <CheckoutFormCard
                pricing={booking.pricing}
                canCheckout={booking.canCheckout}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
              />
            </aside>
          </div>
        )}
      </main>
    </div>
  )
}
