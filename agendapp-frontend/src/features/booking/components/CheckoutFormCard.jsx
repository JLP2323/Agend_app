// CheckoutFormCard.jsx — Formulario del asistente + desglose del 5% + botón de pago.
import { useState } from 'react'
import { Lock } from 'lucide-react'
import Badge from '../../../components/ui/Badge'
import Button from '../../../components/ui/Button'
import InputField from '../../../components/ui/InputField'
import { formatUSD } from '../../../utils/currency'

// Validaciones simples (el backend deberá repetirlas: nunca confíes solo en el frontend)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EC_MOBILE_REGEX = /^9\d{8}$/ // móvil ecuatoriano sin 0 inicial: 9 + 8 dígitos

export default function CheckoutFormCard({
  pricing,                  // { total, deposit, balance } de useBookingState (o null)
  canCheckout = false,      // true cuando servicio, profesional, día y hora están completos
  isSubmitting = false,     // true mientras se procesa el pago (spinner en el botón)
  onSubmit,                 // función({ fullName, whatsapp, email }) al confirmar
}) {
  // --- Estado del formulario (campos controlados) ---
  const [form, setForm] = useState({ fullName: '', whatsapp: '', email: '' })
  const [errors, setErrors] = useState({})

  // Devuelve un handler para un campo concreto, con limpieza opcional del valor.
  const handleChange = (field, clean = (v) => v) => (event) => {
    setForm((prev) => ({ ...prev, [field]: clean(event.target.value) }))
    // Al escribir, quitamos el error de ese campo
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  // WhatsApp: solo dígitos, sin 0 inicial, máximo 9 (el +593 ya está en el prefijo).
  const cleanPhone = (value) => value.replace(/\D/g, '').replace(/^0/, '').slice(0, 9)

  const validate = () => {
    const next = {}
    if (form.fullName.trim().length < 3) next.fullName = 'Ingresa tu nombre completo.'
    if (!EC_MOBILE_REGEX.test(form.whatsapp)) next.whatsapp = 'Ingresa un móvil válido (ej. 991234567).'
    if (!EMAIL_REGEX.test(form.email)) next.email = 'Ingresa un correo válido.'
    setErrors(next)
    return Object.keys(next).length === 0 // true si no hay errores
  }

  const handleSubmit = (event) => {
    event.preventDefault() // evita que el navegador recargue la página
    if (!canCheckout || !validate()) return
    onSubmit?.({
      fullName: form.fullName.trim(),
      whatsapp: `+593${form.whatsapp}`, // formato internacional completo
      email: form.email.trim(),
    })
  }

  return (
    <section
      aria-labelledby="step-checkout"
      className="rounded-2xl border border-surface-border bg-surface p-5 shadow-card sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 id="step-checkout" className="text-lg font-bold text-content">
          <span className="mr-2 text-accent">4.</span>
          Tus datos
        </h2>
        <Badge variant="emerald" size="sm">Sincronizado</Badge>
      </div>

      {/* noValidate: desactiva la validación nativa para usar nuestros mensajes */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <InputField
          label="Nombre completo"
          name="fullName"
          autoComplete="name"
          placeholder="Ej. María Fernanda López"
          value={form.fullName}
          onChange={handleChange('fullName')}
          error={errors.fullName}
        />

        <InputField
          label="WhatsApp móvil"
          name="whatsapp"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          prefix="🇪🇨 +593"
          placeholder="991234567"
          hint="Te enviaremos la confirmación por WhatsApp."
          value={form.whatsapp}
          onChange={handleChange('whatsapp', cleanPhone)}
          error={errors.whatsapp}
        />

        <InputField
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="tu@correo.com"
          value={form.email}
          onChange={handleChange('email')}
          error={errors.email}
        />

        {/* ---------- Desglose financiero del 5% ---------- */}
        {pricing && (
          <dl className="rounded-xl border border-surface-border bg-elevated p-4 text-sm">
            <div className="flex justify-between py-1">
              <dt className="text-content-secondary">Total del servicio</dt>
              <dd className="font-medium text-content">{formatUSD(pricing.total)}</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="font-medium text-emerald-fg">Abono hoy (5%)</dt>
              <dd className="font-bold text-emerald-fg">{formatUSD(pricing.deposit)}</dd>
            </div>
            <div className="mt-1 flex justify-between border-t border-surface-border pt-2">
              <dt className="text-content-secondary">Saldo a pagar en el local (95%)</dt>
              <dd className="font-medium text-content">{formatUSD(pricing.balance)}</dd>
            </div>
          </dl>
        )}

        {/* ---------- Botón de pago ---------- */}
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={isSubmitting}
          disabled={!canCheckout}
          icon={<Lock size={18} />}
        >
          {pricing
            ? `Pagar abono de ${formatUSD(pricing.deposit)} y Confirmar Cita`
            : 'Pagar abono y Confirmar Cita'}
        </Button>

        {/* Guía cuando faltan pasos por completar */}
        {!canCheckout && (
          <p className="text-center text-xs text-content-muted">
            Completa servicio, profesional, día y hora para continuar.
          </p>
        )}
        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-content-muted">
          <Lock size={12} /> Pago seguro. Tus datos están protegidos.
        </p>
      </form>
    </section>
  )
}
