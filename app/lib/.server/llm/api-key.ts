import { GEMINI_API_KEY_ENV, GOOGLE_GENERATIVE_AI_API_KEY_ENV } from './constants'

type EnvLike = Record<string, string | undefined>

const normalize = (value?: string | null) => {
  if (!value) {
    return undefined
  }
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

const readKey = (env?: EnvLike) => {
  if (!env) {
    return undefined
  }
  return normalize(env[GOOGLE_GENERATIVE_AI_API_KEY_ENV]) ?? normalize(env[GEMINI_API_KEY_ENV])
}

export const resolveGoogleGenerativeAIAPIKey = (env?: EnvLike) => {
  const fromArgument = readKey(env)
  if (fromArgument) {
    return fromArgument
  }

  if (typeof process !== 'undefined' && typeof process === 'object' && 'env' in process) {
    const processEnv = process.env as EnvLike
    const fromProcess = readKey(processEnv)
    if (fromProcess) {
      return fromProcess
    }
  }

  throw new Error(
    `Missing Google Generative AI credentials. Set ${GOOGLE_GENERATIVE_AI_API_KEY_ENV} or ${GEMINI_API_KEY_ENV}.`
  )
}
