// ContactDetailsForm.jsx — Pantalla 2 (Columna izquierda, 7 cols): Formulario de
// contacto con prefijo EC +593, recordatorio por WhatsApp, sync Google Calendar y notas.
import { 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CalendarCheck,
  IdCard
} from 'lucide-react'
import Badge from '../../../components/ui/Badge'
import { useBookingFlow } from '../context/BookingFlowContext'

export default function ContactDetailsForm() {
  const { contact, updateContact } = useBookingFlow()

  return (
    <div className="rounded-2xl border border-surface-border bg-surface p-5 sm:p-6 shadow-card">
      {/* 1. Encabezado de la Tarjeta */}
      <div className="flex items-start justify-between gap-3 pb-5 border-b border-surface-border/70">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-elevated text-accent border border-surface-border">
            <IdCard size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-content leading-tight">
              Tus Datos de Contacto
            </h3>
            <p className="mt-0.5 text-xs text-content-secondary">
              Información requerida para emitir tu comprobante digital y boleta fiscal
            </p>
          </div>
        </div>

        <Badge variant="emerald" size="sm" className="shrink-0 font-bold">
          100% Privado
        </Badge>
      </div>

      {/* 2. Formulario de Datos */}
      <div className="mt-5 flex flex-col gap-4 text-xs">
        
        {/* Campo 1: Nombre y Apellido Completo */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-content-secondary">
            Nombre y Apellido Completo
          </label>
          <div className="flex items-center rounded-xl border border-surface-border bg-elevated/70 px-3.5 py-2.5 transition-colors focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
            <User size={16} className="text-content-muted shrink-0 mr-2.5" />
            <input
              type="text"
              value={contact.fullName}
              onChange={(e) => updateContact('fullName', e.target.value)}
              placeholder="María Elena Morales"
              className="w-full bg-transparent text-sm text-content placeholder:text-content-muted outline-none"
            />
          </div>
        </div>

        {/* Campo 2: WhatsApp Móvil con Prefijo EC +593 y píldora de recordatorio */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-content-secondary">
            WhatsApp Móvil (Confirmación & Recordatorio)
          </label>
          <div className="flex items-center rounded-xl border border-surface-border bg-elevated/70 overflow-hidden transition-colors focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
            {/* Prefijo Ecuador */}
            <div className="flex items-center gap-1 border-r border-surface-border bg-surface px-3 py-2.5 text-xs font-bold text-content select-none">
              <span>EC</span>
              <span className="text-content-secondary">+593</span>
            </div>
            {/* Input telefónico */}
            <div className="flex flex-1 items-center px-3">
              <Phone size={15} className="text-content-muted shrink-0 mr-2" />
              <input
                type="tel"
                value={contact.whatsapp}
                onChange={(e) => updateContact('whatsapp', e.target.value)}
                placeholder="99 123 4567"
                className="w-full bg-transparent text-sm text-content placeholder:text-content-muted outline-none"
              />
            </div>
          </div>

          {/* Píldora verde de confirmación instantánea */}
          <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-fg">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-fg" />
            <span>Recibirás confirmación instantánea y recordatorio 24h antes por WhatsApp</span>
          </div>
        </div>

        {/* Campo 3: Correo Electrónico con Sincronización Google Calendar */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-content-secondary">
            Correo Electrónico
          </label>
          <div className="flex items-center rounded-xl border border-surface-border bg-elevated/70 px-3.5 py-2.5 transition-colors focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
            <Mail size={16} className="text-content-muted shrink-0 mr-2.5" />
            <input
              type="email"
              value={contact.email}
              onChange={(e) => updateContact('email', e.target.value)}
              placeholder="maria.morales@ejemplo.com"
              className="w-full bg-transparent text-sm text-content placeholder:text-content-muted outline-none"
            />
          </div>

          {/* Mensaje de Sincronización con Google Calendar */}
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-content-secondary">
            <CalendarCheck size={14} className="text-accent shrink-0" />
            <span>Sincronización con Google Calendar y envío de recibo con código QR en alta resolución.</span>
          </div>
        </div>

        {/* Campo 4: Notas adicionales o Petición Especial (Opcional) */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-content-secondary">
              Notas adicionales o Petición Especial
            </label>
            <span className="text-[11px] text-content-muted">Opcional</span>
          </div>
          <div className="rounded-xl border border-surface-border bg-elevated/70 p-3 transition-colors focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
            <textarea
              rows={2}
              value={contact.notes}
              onChange={(e) => updateContact('notes', e.target.value)}
              placeholder="Ej: Tengo cuero cabelludo sensible, o quisiera sugerencia sobre corte en capas medias..."
              className="w-full resize-none bg-transparent text-sm text-content placeholder:text-content-muted outline-none"
            />
          </div>
        </div>

      </div>
    </div>
  )
}
