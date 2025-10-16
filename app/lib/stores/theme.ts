import { atom } from 'nanostores'

type Theme = 'light' | 'dark'

const defaultTheme: Theme = 'light'

export const themeStore = atom<Theme>(defaultTheme)

export const setTheme = (next: Theme) => {
  themeStore.set(next)

  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', next)
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem('bolt_theme', next)
  }
}

export const toggleTheme = () => {
  const next = themeStore.get() === 'dark' ? 'light' : 'dark'
  setTheme(next)
}
