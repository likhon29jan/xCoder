import { useEffect } from 'react'
import { useStore } from '@nanostores/react'
import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import tailwindReset from '@unocss/reset/tailwind-compat.css?url'
import reactToastifyStyles from 'react-toastify/dist/ReactToastify.css?url'
import xtermStyles from '@xterm/xterm/css/xterm.css?url'
import globalStyles from './styles/index.scss?url'
import { themeStore, setTheme } from './lib/stores/theme'
import { stripIndent } from './utils/stripIndent'
import { createHead } from 'remix-island'
import { SiteHeader } from './components/layout/site-header'
import { SiteFooter } from './components/layout/site-footer'

import 'virtual:uno.css'

export const meta: MetaFunction = () => [
  { charset: 'utf-8' },
  { title: 'TutorialKit' },
  {
    name: 'description',
    content:
      'TutorialKit combines AI-first workflows with mindful design systems so your team can build immersive learning experiences.'
  },
  { name: 'theme-color', content: '#050505' },
  { name: 'viewport', content: 'width=device-width,initial-scale=1' }
]

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: reactToastifyStyles },
  { rel: 'stylesheet', href: tailwindReset },
  { rel: 'stylesheet', href: globalStyles },
  { rel: 'stylesheet', href: xtermStyles },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
  }
]

const inlineThemeCode = stripIndent(`
  (function () {
    try {
      const storageKey = 'bolt_theme'
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const html = document.documentElement

      const applyTheme = theme => {
        html.setAttribute('data-theme', theme)
        html.style.visibility = 'visible'
      }

      const storedTheme = window.localStorage.getItem(storageKey)
      if (storedTheme === 'light' || storedTheme === 'dark') {
        applyTheme(storedTheme)
      } else {
        const systemPrefersDark = mediaQuery.matches
        applyTheme(systemPrefersDark ? 'dark' : 'light')
      }

      mediaQuery.addEventListener('change', event => {
        const currentStored = window.localStorage.getItem(storageKey)
        if (!currentStored) {
          applyTheme(event.matches ? 'dark' : 'light')
        }
      })
    } catch (error) {
      console.warn('Theme initialization failed:', error)
    }
  })();
`)

export const Head = createHead(() => (
  <>
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <Meta />
    <Links />
    <script dangerouslySetInnerHTML={{ __html: inlineThemeCode }} />
    <style dangerouslySetInnerHTML={{ __html: 'html { visibility: hidden; }' }} />
  </>
))

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useStore(themeStore)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const html = document.documentElement
    html.style.visibility = 'visible'

    const stored = window.localStorage.getItem('bolt_theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'bolt_theme' && (event.newValue === 'light' || event.newValue === 'dark')) {
        setTheme(event.newValue)
      }
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleMedia = (event: MediaQueryListEvent) => {
      const storedTheme = window.localStorage.getItem('bolt_theme')
      if (!storedTheme) {
        setTheme(event.matches ? 'dark' : 'light')
      }
    }

    window.addEventListener('storage', handleStorage)
    mediaQuery.addEventListener('change', handleMedia)

    return () => {
      window.removeEventListener('storage', handleStorage)
      mediaQuery.removeEventListener('change', handleMedia)
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className='flex min-h-screen flex-col text-sm text-white'>
      <Head />
      <SiteHeader />
      <main className='flex flex-1 flex-col'>
        {children}
      </main>
      <SiteFooter />
      <ScrollRestoration />
      <Scripts />
    </div>
  )
}

export default function App() {
  return <Outlet />
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  console.error(error)
  return (
    <html>
      <head>
        <title>Application error</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className='flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-900 p-6 text-white'>
          <h1 className='text-2xl font-semibold'>Something went wrong</h1>
          <p className='max-w-xl text-center text-sm text-neutral-300'>{error.message}</p>
          <a className='text-sm text-blue-300 underline' href='/'>
            Return home
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
