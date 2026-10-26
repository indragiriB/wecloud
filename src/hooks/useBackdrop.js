import { useEffect } from 'react'

const lerp = (a, b, t) => a + (b - a) * t
const ease = (t) => t * t * (3 - 2 * t)

/**
 * Moves the fixed backdrop (the red disc) between one waypoint per section as
 * the page scrolls. `stops` has one { x, y, s } per id: x and y are viewport
 * percentages for the disc centre, s is a scale. Writes CSS variables on `ref`.
 */
export function useBackdrop(ref, ids, stops) {
  const key = ids.join('|')

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const list = key.split('|')
    let raf = 0

    const update = () => {
      raf = 0
      const mid = window.scrollY + window.innerHeight * 0.5
      const centres = list.map((id) => {
        const s = document.getElementById(id)
        if (!s) return null
        const r = s.getBoundingClientRect()
        return window.scrollY + r.top + r.height / 2
      })

      let x = stops[0].x
      let y = stops[0].y
      let sc = stops[0].s
      for (let i = 0; i < list.length; i++) {
        if (centres[i] == null) continue
        if (mid >= centres[i]) {
          ;({ x, y, s: sc } = stops[i])
          const next = centres.findIndex((c, j) => j > i && c != null)
          if (next !== -1 && mid < centres[next]) {
            const t = ease((mid - centres[i]) / (centres[next] - centres[i]))
            x = lerp(stops[i].x, stops[next].x, t)
            y = lerp(stops[i].y, stops[next].y, t)
            sc = lerp(stops[i].s, stops[next].s, t)
          }
        }
      }

      const max = document.documentElement.scrollHeight - window.innerHeight
      el.style.setProperty('--dx', x.toFixed(2))
      el.style.setProperty('--dy', y.toFixed(2))
      el.style.setProperty('--ds', sc.toFixed(3))
      el.style.setProperty('--p', max > 0 ? (window.scrollY / max).toFixed(4) : '0')
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    // Layout can shift after fonts load; re-measure once things settle.
    const late = setTimeout(update, 600)
    document.fonts?.ready.then(schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      clearTimeout(late)
      cancelAnimationFrame(raf)
    }
  }, [ref, key, stops])
}
