import { useEffect } from 'react'

export type ShortcutModifier = 'meta' | 'ctrl' | 'alt' | 'shift'

export type ShortcutDefinition = {
  key: string
  handler: (event: KeyboardEvent) => void
  modifiers?: ShortcutModifier[]
  enabled?: boolean
  allowInInput?: boolean
  preventDefault?: boolean
}

export type UseShortcutsOptions = {
  enabled?: boolean
  target?: Document | HTMLElement | Window | null
  dependencies?: unknown[]
}

function isEditable(target: EventTarget | null): target is HTMLElement {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  const tagName = target.tagName.toLowerCase()

  if (target.isContentEditable) {
    return true
  }

  return tagName === 'input' || tagName === 'textarea' || tagName === 'select'
}

export function useShortcuts(shortcuts: ShortcutDefinition[], options: UseShortcutsOptions = {}) {
  const { enabled = true, target, dependencies = [] } = options

  useEffect(() => {
    if (!enabled || shortcuts.length === 0) {
      return
    }

    if (typeof window === 'undefined' && !target) {
      return
    }

    const node: Document | HTMLElement | Window = target ?? window

    const listener: EventListener = (event) => {
      if (!(event instanceof KeyboardEvent)) {
        return
      }

      if (event.defaultPrevented) {
        return
      }

      shortcutLoop: for (const shortcut of shortcuts) {
        if (shortcut.enabled === false) {
          continue
        }

        if (!shortcut.allowInInput && isEditable(event.target)) {
          continue
        }

        const required = new Set(shortcut.modifiers ?? [])
        const active = {
          meta: event.metaKey,
          ctrl: event.ctrlKey,
          alt: event.altKey,
          shift: event.shiftKey,
        } as const

        for (const modifier of ['meta', 'ctrl', 'alt', 'shift'] as const) {
          if (required.has(modifier) !== active[modifier]) {
            continue shortcutLoop
          }
        }

        if (event.key.toLowerCase() !== shortcut.key.toLowerCase()) {
          continue
        }

        if (shortcut.preventDefault) {
          event.preventDefault()
        }

        shortcut.handler(event)
        break
      }
    }

    node.addEventListener('keydown', listener)

    return () => {
      node.removeEventListener('keydown', listener)
    }
  }, [enabled, shortcuts, target, ...dependencies])
}
