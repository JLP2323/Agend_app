// BusinessSidebarCard.jsx — Columna izquierda (3 cols): Información del negocio, horarios y garantías.
import { 
  Star, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  Leaf, 
  Wifi, 
  Car, 
  MessageSquare,
  CheckCircle2
} from 'lucide-react'
import Badge from '../../../components/ui/Badge'

export default function BusinessSidebarCard({
  business = { 
    name: 'Salón Lumina',
    tagline: 'Estilismo de autor, colorimetría & spa capilar',
    isOpen: true,
    rating: 4.9,
    reviewCount: 128,
    address: 'Av. Samborondón km 3.5, Edificio Platinum Plaza, Piso 1, Of. 104',
    phoneFormatted: '+593 99 123 4567',
    whatsappLink: 'https://wa.me/593991234567',
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
    logoImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=120&q=80'
  }
}) {
  return (
    <aside className="flex flex-col gap-4">
      {/* 1. Tarjeta Principal de Perfil */}
      <div className="overflow-hidden rounded-2xl border border-surface-border bg-surface shadow-card">
        {/* Portada con Badge 'ABIERTO AHORA' */}
        <div className="relative h-32 w-full bg-elevated">
          <img 
            src={business.coverImage} 
            alt={business.name} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-3 right-3">
            <Badge 
              variant="emerald" 
              size="sm"
              icon={
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-fg opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-fg" />
                </span>
              }
            >
              Abierto Ahora
            </Badge>
          </div>
        </div>

        {/* Encabezado: Logo flotante, Título y Rating */}
        <div className="px-5 pb-5">
          <div className="relative -mt-10 mb-3 flex items-end justify-between">
            <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-surface bg-elevated shadow-md">
              <img 
                src={business.logoImage} 
                alt={`Logo ${business.name}`} 
                className="h-full w-full object-cover"
              />
            </div>
            {/* Rating */}
            <div className="flex items-center gap-1 text-xs font-semibold text-content">
              <Star size={14} className="fill-amber-fg text-amber-fg" />
              <span>{business.rating}</span>
              <span className="text-content-muted font-normal">({business.reviewCount})</span>
            </div>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-content">
            {business.name}
          </h1>
          <p className="mt-1 text-xs leading-relaxed text-content-secondary">
            {business.tagline}
          </p>

          {/* Dirección física y Contacto */}
          <div className="mt-4 space-y-2 border-t border-surface-border pt-4 text-xs text-content-secondary">
            <div className="flex items-start gap-2.5">
              <MapPin size={15} className="shrink-0 text-accent mt-0.5" />
              <span>{business.address}</span>
            </div>

            <a
              href={business.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-medium text-emerald-fg hover:underline"
            >
              <MessageSquare size={15} className="shrink-0" />
              <span>{business.phoneFormatted}</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>
          </div>

          {/* Horarios de Atención */}
          <div className="mt-4 border-t border-surface-border pt-4">
            <div className="flex items-center justify-between text-xs font-semibold text-content">
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-accent" />
                Horarios de Atención
              </span>
              <span className="text-[10px] text-content-muted font-medium">GMT-5</span>
            </div>

            <ul className="mt-2.5 space-y-1.5 text-xs">
              <li className="flex justify-between text-content-secondary">
                <span>Lunes – Viernes</span>
                <span className="font-medium text-content">09:00 AM – 08:00 PM</span>
              </li>
              <li className="flex justify-between text-content-secondary">
                <span>Sábados</span>
                <span className="font-medium text-content">09:00 AM – 07:00 PM</span>
              </li>
              <li className="flex justify-between text-content-muted">
                <span>Domingos</span>
                <span className="font-medium text-danger-fg">Cerrado</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Tarjeta Garantía Lumina & AgendApp */}
      <div className="rounded-2xl border border-surface-border bg-surface p-4 shadow-card">
        <div className="flex items-center gap-2 text-sm font-bold text-content">
          <ShieldCheck size={18} className="text-emerald-fg" />
          <span>Garantía Lumina & AgendApp</span>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-content-secondary">
          <strong className="text-content">Reservas aseguradas con 5% de abono.</strong> Tu turno queda bloqueado en tiempo real sin riesgo de sobreventas ni cancelaciones unilaterales.
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-surface-border pt-3 text-[11px] text-content-muted font-medium">
          <span className="flex items-center gap-1 text-emerald-fg">
            <CheckCircle2 size={13} />
            Cancelación flexible 24h
          </span>
          <span className="text-accent hover:underline cursor-pointer">
            Soporte VIP
          </span>
        </div>
      </div>

      {/* 3. Píldoras de Beneficios Adicionales */}
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-surface-border bg-surface p-2.5 text-center text-[10px] font-medium text-content-secondary shadow-xs">
          <Leaf size={14} className="text-emerald-fg" />
          <span>Productos Veganos</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-surface-border bg-surface p-2.5 text-center text-[10px] font-medium text-content-secondary shadow-xs">
          <Wifi size={14} className="text-accent" />
          <span>Wi-Fi Alta Velocidad</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-surface-border bg-surface p-2.5 text-center text-[10px] font-medium text-content-secondary shadow-xs">
          <Car size={14} className="text-amber-fg" />
          <span>Parking Gratuito</span>
        </div>
      </div>
    </aside>
  )
}
