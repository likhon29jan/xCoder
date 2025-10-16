import { Link, NavLink } from '@remix-run/react'
import { primaryNavigation, companyNavigation } from '../../data/navigation'
import { ThemeToggle } from '../ui/theme-toggle'

const baseLinkStyles =
  'inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-150'

export const SiteHeader = () => {
  const navItems = [...primaryNavigation, ...companyNavigation]

  return (
    <header className='sticky top-0 z-40 border-b border-neutral-800/40 bg-[rgba(10,10,10,0.75)] backdrop-blur'>
      <div className='mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4'>
        <Link to='/' className='flex items-center gap-2 text-base font-semibold tracking-tight text-white'>
          <span className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white'>
            TK
          </span>
          TutorialKit
        </Link>
        <nav className='hidden items-center gap-1 md:flex'>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              prefetch='intent'
              className={({ isActive }) =>
                [
                  baseLinkStyles,
                  isActive
                    ? 'bg-white text-neutral-900'
                    : 'text-neutral-200 hover:bg-white/10 hover:text-white'
                ].join(' ')
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className='flex items-center gap-3'>
          <ThemeToggle />
          <Link
            to='/login'
            prefetch='intent'
            className='hidden rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-white/40 hover:text-white md:inline-flex'
          >
            Log in
          </Link>
          <Link
            to='/register'
            prefetch='intent'
            className='inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200'
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}
