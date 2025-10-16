import type { FormEvent } from 'react'
import { useEffect } from 'react'
import { Link } from '@remix-run/react'
import { useStore } from '@nanostores/react'
import {
  authFormStore,
  resetAuthForm,
  setAuthField,
  submitAuthForm
} from '../lib/stores/auth-form'

export default function Login() {
  const state = useStore(authFormStore)

  useEffect(() => {
    resetAuthForm('login')
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!state.email || !state.password) {
      return
    }
    await submitAuthForm()
  }

  return (
    <div className='flex flex-1 items-center justify-center px-6 py-16'>
      <div className='w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-black/40 p-8 text-white shadow-xl backdrop-blur'>
        <div className='space-y-2 text-center'>
          <h1 className='text-2xl font-semibold'>Welcome back</h1>
          <p className='text-sm text-neutral-400'>Log in to continue crafting mindful learning journeys.</p>
        </div>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <label className='text-xs font-semibold uppercase tracking-wide text-neutral-300' htmlFor='email'>
              Email
            </label>
            <input
              id='email'
              type='email'
              autoComplete='email'
              required
              value={state.email}
              onChange={event => setAuthField('email', event.target.value)}
              className='w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40'
            />
          </div>
          <div className='space-y-2'>
            <label className='text-xs font-semibold uppercase tracking-wide text-neutral-300' htmlFor='password'>
              Password
            </label>
            <input
              id='password'
              type='password'
              autoComplete='current-password'
              required
              value={state.password}
              onChange={event => setAuthField('password', event.target.value)}
              className='w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40'
            />
          </div>
          <button
            type='submit'
            className='inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-white/60'
            disabled={state.status === 'submitting'}
          >
            {state.status === 'submitting' ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        {state.message && (
          <p
            className={`text-sm ${state.status === 'error' ? 'text-red-300' : 'text-emerald-300'}`}
          >
            {state.message}
          </p>
        )}
        <p className='text-center text-sm text-neutral-400'>
          Need an account?{' '}
          <Link to='/register' className='text-white underline'>
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
