import { map } from 'nanostores'

type AuthFormMode = 'login' | 'register'

type AuthFormState = {
  mode: AuthFormMode
  email: string
  password: string
  confirmPassword: string
  name: string
  status: 'idle' | 'submitting' | 'success' | 'error'
  message: string | null
}

const initialState: AuthFormState = {
  mode: 'login',
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  status: 'idle',
  message: null
}

export const authFormStore = map<AuthFormState>(initialState)

export const resetAuthForm = (mode: AuthFormMode) => {
  authFormStore.set({
    ...initialState,
    mode
  })
}

type AuthField = keyof Pick<AuthFormState, 'email' | 'password' | 'confirmPassword' | 'name'>

export const setAuthField = (field: AuthField, value: string) => {
  authFormStore.setKey(field, value)
  if (authFormStore.get().status !== 'idle') {
    authFormStore.setKey('status', 'idle')
    authFormStore.setKey('message', null)
  }
}

export const setAuthError = (message: string) => {
  authFormStore.setKey('status', 'error')
  authFormStore.setKey('message', message)
}

export const submitAuthForm = async () => {
  authFormStore.setKey('status', 'submitting')
  authFormStore.setKey('message', null)

  await new Promise(resolve => setTimeout(resolve, 450))

  const current = authFormStore.get()
  const greetingName = current.name || current.email.split('@')[0] || 'there'

  authFormStore.set({
    ...current,
    status: 'success',
    message:
      current.mode === 'login'
        ? `Welcome back, ${greetingName}!`
        : `Account created for ${greetingName}. Check your inbox for confirmation.`
  })
}
