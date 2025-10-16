import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type SnapScrollOptions = {
  behavior?: ScrollBehavior
  threshold?: number
  offset?: number
}

export type SnapScrollHandle<T extends HTMLElement> = {
  containerRef: (node: T | null) => void
  scrollToBottom: (options?: { immediate?: boolean }) => void
  snapToBottom: () => void
  isAutoScrolling: () => boolean
  recalculate: () => void
}

export function useSnapScroll<T extends HTMLElement>(options: SnapScrollOptions = {}): SnapScrollHandle<T> {
  const { behavior = 'smooth', threshold = 32, offset = 0 } = options
  const containerRef = useRef<T | null>(null)
  const [container, setContainer] = useState<T | null>(null)
  const autoScrollRef = useRef(true)
  const frameRef = useRef<number | null>(null)

  const assignContainer = useCallback((node: T | null) => {
    containerRef.current = node
    setContainer(node)
  }, [])

  const cancelFrame = useCallback(() => {
    if (frameRef.current != null) {
      if (typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(frameRef.current)
      }

      frameRef.current = null
    }
  }, [])

  const calculateAutoScroll = useCallback(() => {
    const element = containerRef.current

    if (!element) {
      return
    }

    const distance = element.scrollHeight - element.clientHeight - element.scrollTop - offset
    autoScrollRef.current = distance <= threshold
  }, [offset, threshold])

  const scrollToBottom = useCallback<
    SnapScrollHandle<T>['scrollToBottom']
  >(
    (scrollOptions = {}) => {
      const element = containerRef.current

      if (!element) {
        return
      }

      const top = Math.max(element.scrollHeight - element.clientHeight - offset, 0)
      const resolvedBehavior = scrollOptions.immediate ? 'auto' : behavior

      element.scrollTo({
        top,
        behavior: resolvedBehavior,
      })
    },
    [behavior, offset],
  )

  const snapToBottom = useCallback(() => {
    if (!autoScrollRef.current) {
      return
    }

    if (typeof requestAnimationFrame === 'function') {
      cancelFrame()
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null
        scrollToBottom()
      })
    } else {
      scrollToBottom()
    }
  }, [cancelFrame, scrollToBottom])

  const isAutoScrolling = useCallback(() => autoScrollRef.current, [])

  useEffect(() => cancelFrame, [cancelFrame])

  useEffect(() => {
    const element = container

    if (!element) {
      return
    }

    const handleScroll = () => {
      calculateAutoScroll()
    }

    element.addEventListener('scroll', handleScroll, { passive: true })
    calculateAutoScroll()

    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [calculateAutoScroll, container])

  const recalculate = useCallback(() => {
    calculateAutoScroll()

    if (autoScrollRef.current) {
      snapToBottom()
    }
  }, [calculateAutoScroll, snapToBottom])

  return useMemo(
    () => ({
      containerRef: assignContainer,
      scrollToBottom,
      snapToBottom,
      isAutoScrolling,
      recalculate,
    }),
    [assignContainer, isAutoScrolling, recalculate, scrollToBottom, snapToBottom],
  )
}
