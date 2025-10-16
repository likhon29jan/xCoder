export type MarketingSection = {
  heading: string
  body: string
  points?: string[]
}

type MarketingPageProps = {
  title: string
  description: string
  sections: MarketingSection[]
}

export const MarketingPage = ({ title, description, sections }: MarketingPageProps) => {
  return (
    <div className='flex flex-1 flex-col px-6 py-16 md:px-12'>
      <div className='mx-auto flex w-full max-w-4xl flex-col gap-4 text-center text-white'>
        <h1 className='text-balance text-4xl font-semibold tracking-tight md:text-5xl'>{title}</h1>
        <p className='text-balance text-base text-neutral-300 md:text-lg'>{description}</p>
      </div>
      <div className='mx-auto mt-12 grid w-full max-w-4xl gap-6 md:gap-8'>
        {sections.map(section => (
          <section key={section.heading} className='rounded-3xl border border-white/10 bg-white/5 p-6 text-left text-neutral-100 shadow-xl backdrop-blur-sm md:p-8'>
            <h2 className='text-2xl font-semibold text-white'>{section.heading}</h2>
            <p className='mt-3 text-sm text-neutral-300'>{section.body}</p>
            {section.points && section.points.length > 0 && (
              <ul className='mt-4 space-y-2 text-sm text-neutral-200'>
                {section.points.map(point => (
                  <li key={point} className='flex items-start gap-2'>
                    <span className='mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full bg-white/70' />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
