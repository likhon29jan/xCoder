import { useCallback, useMemo, useRef, useState } from 'react'
import { useMessageParser } from './useMessageParser'

export type EnhancePromptOptions = {
  onToken?: (token: string) => void
}

export type PromptEnhancer = {
  value: string
  isEnhancing: boolean
  error: Error | null
  enhance: (prompt: string, options?: EnhancePromptOptions) => Promise<string>
  cancel: () => void
  reset: () => void
}

export function usePromptEnhancer(): PromptEnhancer {
  const { value, parse, reset: resetParser, isStreaming, error: parserError } = useMessageParser()
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [fetchError, setFetchError] = useState<Error | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const cancel = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort()
      abortRef.current = null
    }

    setIsEnhancing(false)
  }, [])

  const enhance = useCallback<PromptEnhancer['enhance']>(
    async (prompt, options = {}) => {
      cancel()

      const controller = new AbortController()
      abortRef.current = controller

      setFetchError(null)
      setIsEnhancing(true)
      resetParser()

      try {
        const response = await fetch('/api/enhancer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: prompt }),
          signal: controller.signal,
        })

        if (!response.ok || !response.body) {
          throw new Error('Prompt enhancer request failed')
        }

        const result = await parse(response, {
          signal: controller.signal,
          onToken: options.onToken,
        })

        return result
      } catch (thrown) {
        if (controller.signal.aborted) {
          throw new DOMException('Enhancer aborted', 'AbortError')
        }

        const reason = thrown instanceof Error ? thrown : new Error('Failed to enhance prompt')
        setFetchError(reason)
        throw reason
      } finally {
        setIsEnhancing(false)
        abortRef.current = null
      }
    },
    [cancel, parse, resetParser],
  )

  const reset = useCallback(() => {
    cancel()
    setFetchError(null)
    resetParser()
  }, [cancel, resetParser])

  return useMemo(
    () => ({
      value,
      isEnhancing: isEnhancing || isStreaming,
      error: fetchError ?? parserError,
      enhance,
      cancel,
      reset,
    }),
    [cancel, enhance, fetchError, isEnhancing, isStreaming, parserError, reset, value],
  )
}
