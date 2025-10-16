import { Link } from '@remix-run/react'
import {
  primaryNavigation,
  companyNavigation,
  legalNavigation
} from '../../data/navigation'

const sections = [
  { title: 'Explore', links: primaryNavigation },
  { title: 'Company', links: companyNavigation },
  { title: 'Legal', links: legalNavigation }
]

export const SiteFooter = () => {
  return (
    <footer className='border-t border-white/10 bg-[rgba(10,10,10,0.9)] text-neutral-300'>
      <div className='mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:justify-between'>
        <div className='max-w-sm space-y-3'>
          <p className='text-lg font-semibold text-white'>Craft with intention.</p>
          <p className='text-sm leading-relaxed text-neutral-400'>
            TutorialKit pairs AI superpowers with thoughtful tooling so teams can design, build, and ship with clarity.
          </p>
        </div>
        <div className='grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3'>
          {sections.map(section => (
            <div key={section.title} className='space-y-3'>
              <p className='text-sm font-semibold uppercase tracking-wide text-neutral-200'>
                {section.title}
              </p>
              <ul className='space-y-2 text-sm'>
                {section.links.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      prefetch='intent'
                      className='text-neutral-400 transition hover:text-white'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className='border-t border-white/10 bg-black/60 py-6'>
        <p className='mx-auto max-w-6xl px-6 text-xs text-neutral-500'>
          © 2025 Likhon Sheikh - All rights reserved.
        </p>
      </div>
    </footer>
  )
}
