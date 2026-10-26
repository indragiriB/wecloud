import { useEffect, useMemo, useState } from 'react'

const pad = (n) => String(n).padStart(2, '0')

/** Ticks every second and returns { h, m, s } in the given IANA timezone. */
export function useClock(timeZone) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const formatter = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23',
      })
    } catch {
      return null // invalid timezone name: fall back to the visitor's clock
    }
  }, [timeZone])

  if (!formatter) {
    return { h: pad(now.getHours()), m: pad(now.getMinutes()), s: now.getSeconds() }
  }
  const parts = Object.fromEntries(
    formatter.formatToParts(now).map((p) => [p.type, p.value]),
  )
  return { h: parts.hour, m: parts.minute, s: Number(parts.second) }
}
