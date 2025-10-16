import { useCallback, useMemo, useState } from 'react'

type StreamLike = ReadableStream<Uint8Array> | Response

export type ParseStreamOptions = {
  signal?: AbortSignal
  onToken?: (token: string) => void
}

export type MessageParser = {
  value: string
  isStreaming: boolean
  error: Error | null
  parse: (input: StreamLike, options?: ParseStreamOptions) => Promise<string>
  reset: () => void
}

function isResponse(input: StreamLike): input is Response {
  return typeof Response !== 'undefined' && input instanceof Response
}

export function useMessageParser(): MessageParser {
  const [value, setValue] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const parse = useCallback<
    MessageParser['parse']
  >(async (input, options = {}) => {
    const stream = isResponse(input) ? input.body : input

    if (!stream) {
      setValue('')
      return ''
    }

    const reader = stream.getReader()
    const decoder = new TextDecoder()

    setIsStreaming(true)
    setError(null)
    setValue('')

    let aggregated = ''
    let buffer = ''

    try {
      while (true) {
        if (options.signal?.aborted) {
          throw new DOMException('Aborted', 'AbortError')
        }

        const { done, value: chunk } = await reader.read()

        if (done) {
          break
        }

        const text = decoder.decode(chunk, { stream: true })

        if (text.includes('data:')) {
          buffer += text
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            const trimmed = line.trim()

            if (!trimmed.startsWith('data:')) {
              continue
            }

            const payload = trimmed.replace(/^data:\s*/, '')

            if (payload === '' || payload === '[DONE]') {
              continue
            }

            let addition = ''

            try {
              const parsed = JSON.parse(payload)

              if (typeof parsed === 'string') {
                addition = parsed
              } else if (parsed && typeof parsed.value === 'string') {
                addition = parsed.value
              } else if (parsed && typeof parsed.text === 'string') {
                addition = parsed.text
              }
            } catch (parseError) {
              addition = payload
            }

            if (addition.length === 0) {
              continue
            }

            aggregated += addition
            options.onToken?.(addition)
            setValue((previous) => previous + addition)
          }
        } else {
          aggregated += text
          options.onToken?.(text)
          setValue((previous) => previous + text)
        }
      }

      const remainder = decoder.decode()

      if (remainder) {
        if (remainder.includes('data:')) {
          buffer += remainder
        } else {
          aggregated += remainder
          options.onToken?.(remainder)
          setValue((previous) => previous + remainder)
        }
      }

      if (buffer.length > 0) {
        const trimmed = buffer.trim()

        if (trimmed.startsWith('data:')) {
          const payload = trimmed.replace(/^data:\s*/, '')

          if (payload !== '' && payload !== '[DONE]') {
            try {
              const parsed = JSON.parse(payload)
              const addition =
                typeof parsed === 'string'
                  ? parsed
                  : typeof parsed?.value === 'string'
                  ? parsed.value
                  : typeof parsed?.text === 'string'
                  ? parsed.text
                  : payload

              aggregated += addition
              options.onToken?.(addition)
              setValue((previous) => previous + addition)
            } catch (parseError) {
              aggregated += payload
              options.onToken?.(payload)
              setValue((previous) => previous + payload)
            }
          }
        } else if (trimmed.length > 0) {
          aggregated += buffer
          options.onToken?.(buffer)
          setValue((previous) => previous + buffer)
        }
      }

      setIsStreaming(false)
      return aggregated
    } catch (thrown) {
      const reason = thrown instanceof Error ? thrown : new Error('Failed to parse stream')
      setError(reason)
      setIsStreaming(false)
      throw reason
    } finally {
      try {
        reader.releaseLock()
      } catch (releaseError) {
        // ignore failures when the stream is already closed
      }
    }
  }, [])

  const reset = useCallback(() => {
    setValue('')
    setIsStreaming(false)
    setError(null)
  }, [])

  return useMemo(
    () => ({
      value,
      isStreaming,
      error,
      parse,
      reset,
    }),
    [error, isStreaming, parse, reset, value],
  )
}
