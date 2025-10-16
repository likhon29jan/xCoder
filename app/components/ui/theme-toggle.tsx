import { useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { themeStore, toggleTheme, setTheme } from '../../lib/stores/theme'

export const ThemeToggle = () => {
  const theme = useStore(themeStore)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const stored = window.localStorage.getItem('bolt_theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    }
  }, [])

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-medium text-white transition hover:border-white/40 hover:text-white'
      aria-label={`Activate ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
