import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/**
 * ThemeContext: fuente única de verdad del tema (dark | light).
 * - Aplica/quita la clase `.dark` en <html> (lo que activa los tokens de index.css).
 * - Persiste la elección en localStorage.
 * - Por defecto: oscuro.
 */

const STORAGE_KEY = 'agendapp-theme'
const DEFAULT_THEME = 'dark'

const ThemeContext = createContext(null)

// Se ejecuta UNA vez (initializer perezoso de useState), no en cada render.
function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : DEFAULT_THEME
  } catch {
    // localStorage puede fallar (modo privado, SSR)
    return DEFAULT_THEME
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  // Sincroniza el estado de React con el DOM y con localStorage.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignorar */
    }
  }, [theme])

  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [],
  )

  // useMemo evita re-renderizar a todos los consumidores si nada cambió.
  const value = useMemo(
    () => ({ theme, isDark: theme === 'dark', toggleTheme }),
    [theme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme debe usarse dentro de <ThemeProvider>')
  return ctx
}
