'use client'

import * as React from 'react'

/**
 * Hook that tracks mouse position relative to an element and sets
 * CSS custom properties --mx and --my (in percentages) for cursor-following
 * glow effects. Usage: const ref = useCursorGlow() then <div ref={ref} className="cursor-glow">
 */
export function useCursorGlow<T extends HTMLElement = HTMLDivElement>() {
  const ref = React.useRef<T>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion — don't attach the listener
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--mx', `${x}%`)
      el.style.setProperty('--my', `${y}%`)
    }

    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  return ref
}
