import type { ActionFunctionArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { Form, useActionData } from '@remix-run/react'
import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { orchestrate } from '../../src/agents/orchestrator'
import { themeStore } from '../lib/stores/theme'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const prompt = (formData.get('prompt') as string | null)?.trim()

  if (!prompt) {
    return json({ error: 'Please describe the component you want to build.' }, { status: 400 })
  }

  const result = await orchestrate(prompt)
  return json({ result })
}

const highlights = [
  {
    title: 'Composable building blocks',
    description: 'Ship accessible UI primitives that slot into your design system without extra ceremony.'
  },
  {
    title: 'AI-native workflows',
    description: 'Leverage the Vercel AI SDK to scaffold flows, refine states, and iterate safely with TDD discipline.'
  },
  {
    title: 'Mindful operations',
    description: 'From code reviews to deployments, everything is instrumented for focus, feedback, and resilience.'
  }
]

export default function Index() {
  const actionData = useActionData<typeof action>()
  const theme = useStore(themeStore)

  useEffect(() => {
    document.title = 'TutorialKit — Build mindful learning experiences'
  }, [])

  return (
    <div className='flex flex-1 flex-col gap-16 px-6 py-16 md:px-12'>
      <section className='mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center'>
        <span className='rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70'>
          Be present • Be humble • Be thorough
        </span>
        <h1 className='text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl'>
          Build immersive tutorials with AI-grade precision
        </h1>
        <p className='max-w-2xl text-balance text-base text-neutral-300 md:text-lg'>
          Before writing code, align on intent. TutorialKit keeps your rituals, design systems, and quality gates intact while the Vercel AI SDK accelerates every iteration.
        </p>
        <div className='flex flex-col items-center gap-4 md:flex-row'>
          <a
            href='/resources'
            className='inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200'
          >
            Explore the resource library
          </a>
          <a
            href='/gallery'
            className='inline-flex items-center rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/60'
          >
            View crafted examples
          </a>
        </div>
      </section>

      <section className='mx-auto grid w-full max-w-5xl gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg md:grid-cols-[1.1fr,0.9fr] md:p-12'>
        <div className='flex flex-col gap-6'>
          <h2 className='text-2xl font-semibold text-white'>Prototype with intention</h2>
          <p className='text-sm text-neutral-300'>
            Tell TutorialKit what you need and receive production-ready scaffolds informed by your rituals. Every response respects accessibility, testing, and system mindfulness.
          </p>
          <Form method='post' className='flex flex-col gap-3'>
            <label className='text-left text-xs font-semibold uppercase tracking-wide text-neutral-300' htmlFor='prompt'>
              Prompt
            </label>
            <textarea
              id='prompt'
              name='prompt'
              className='min-h-[140px] rounded-2xl border border-white/20 bg-black/40 p-4 text-sm text-white placeholder:text-neutral-500 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40'
              placeholder='“Design a step-by-step onboarding walkthrough for a new AI-powered dashboard.”'
              required
            />
            <button
              type='submit'
              className='inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200'
            >
              Generate with TutorialKit
            </button>
            {actionData?.error && (
              <p className='text-sm text-red-300'>{actionData.error}</p>
            )}
          </Form>
        </div>
        <div className='flex flex-col justify-between gap-6 rounded-2xl border border-dashed border-white/10 bg-black/30 p-6 text-left text-sm text-neutral-200 shadow-inner'>
          <p className='text-xs uppercase tracking-[0.35em] text-white/60'>
            Output preview
          </p>
          <pre className='max-h-[320px] overflow-y-auto rounded-xl bg-black/60 p-4 text-left text-xs text-white/90 shadow-lg'>
            <code>
              {actionData?.result ?? '// Awaiting your mindful prompt...'}
            </code>
          </pre>
          <p className='text-xs text-neutral-400'>
            Current theme: <span className='font-semibold text-white'>{theme}</span>
          </p>
        </div>
      </section>

      <section className='mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-3'>
        {highlights.map(item => (
          <article key={item.title} className='flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm'>
            <h3 className='text-lg font-semibold text-white'>{item.title}</h3>
            <p className='text-sm text-neutral-300'>{item.description}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
