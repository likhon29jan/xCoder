import { google, createGoogleGenerativeAI } from '@ai-sdk/google'

import { resolveGoogleGenerativeAIAPIKey } from './api-key'
import { DEFAULT_GOOGLE_GENERATIVE_AI_MODEL } from './constants'

type EnvLike = Record<string, string | undefined>

type GoogleModelOptions = {
  model?: string
  apiKey?: string
  env?: EnvLike
}

export const createGoogleGenerativeAIModel = ({
  model = DEFAULT_GOOGLE_GENERATIVE_AI_MODEL,
  apiKey,
  env
}: GoogleModelOptions = {}) => {
  const resolvedApiKey = apiKey ?? resolveGoogleGenerativeAIAPIKey(env)
  const provider = createGoogleGenerativeAI({ apiKey: resolvedApiKey })
  return provider(model)
}

export const getDefaultGoogleGenerativeAIModel = () => google(DEFAULT_GOOGLE_GENERATIVE_AI_MODEL)
