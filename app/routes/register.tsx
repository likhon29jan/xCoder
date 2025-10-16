import type { FormEvent } from 'react'
import { useEffect } from 'react'
import { Link } from '@remix-run/react'
import { useStore } from '@nanostores/react'
import {
  authFormStore,
  resetAuthForm,
  setAuthField,
  setAuthError,
  submitAuthForm
} from '../lib/stores/auth-form'

export default function Register() {
  const state = useStore(authFormStore)

  useEffect(() => {
    resetAuthForm('register')
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!state.email || !state.password || !state.confirmPassword) {
      setAuthError('All fields are required.')
      return
    }

    if (state.password !== state.confirmPassword) {
      setAuthError('Passwords must match before we can continue.')
      return
    }

    await submitAuthForm()
  }

  return (
    <div className='flex flex-1 items-center justify-center px-6 py-16'>
      <div className='w-full max-w-lg space-y-8 rounded-3xl border border-white/10 bg-black/40 p-8 text-white shadow-xl backdrop-blur'>
        <div className='space-y-2 text-center'>
          <h1 className='text-2xl font-semibold'>Create your TutorialKit account</h1>
          <p className='text-sm text-neutral-400'>Honor the rituals. Automate the rest.</p>
        </div>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <label className='text-xs font-semibold uppercase tracking-wide text-neutral-300' htmlFor='name'>
              Full name
            </label>
            <input
              id='name'
              type='text'
              autoComplete='name'
              value={state.name}
              onChange={event => setAuthField('name', event.target.value)}
              className='w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40'
            />
          </div>
          <div className='space-y-2'>
            <label className='text-xs font-semibold uppercase tracking-wide text-neutral-300' htmlFor='register-email'>
              Email
            </label>
            <input
              id='register-email'
              type='email'
              autoComplete='email'
              required
              value={state.email}
              onChange={event => setAuthField('email', event.target.value)}
              className='w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40'
            />
          </div>
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <label className='text-xs font-semibold uppercase tracking-wide text-neutral-300' htmlFor='register-password'>
                Password
              </label>
              <input
                id='register-password'
                type='password'
                autoComplete='new-password'
                required
                value={state.password}
                onChange={event => setAuthField('password', event.target.value)}
                className='w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-xs font-semibold uppercase tracking-wide text-neutral-300' htmlFor='confirm-password'>
                Confirm password
              </label>
              <input
                id='confirm-password'
                type='password'
                autoComplete='new-password'
                required
                value={state.confirmPassword}
                onChange={event => setAuthField('confirmPassword', event.target.value)}
                className='w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40'
              />
            </div>
          </div>
          <button
            type='submit'
            className='inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-white/60'
            disabled={state.status === 'submitting'}
          >
            {state.status === 'submitting' ? 'Creating account…' : 'Create account'}
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
          Already have an account?{' '}
          <Link to='/login' className='text-white underline'>
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
