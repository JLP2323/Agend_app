// App.jsx — Raíz de la aplicación: monta los proveedores globales y la página.
import { ThemeProvider } from './context/ThemeContext'                       // Fase 2
import PublicBookingPage from './features/booking/pages/PublicBookingPage'    // Fase 6

export default function App() {
  return (
    // ThemeProvider envuelve TODO lo que necesite saber el tema (ej. PublicNavbar).
    // Cualquier componente hijo puede llamar a useTheme() sin recibir props.
    <ThemeProvider>
      <PublicBookingPage />
    </ThemeProvider>
  )
}
