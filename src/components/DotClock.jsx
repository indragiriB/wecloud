import { layoutText, toPath } from '../lib/dotFont'
import { useClock } from '../hooks/useClock'

const ring = (n, r) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2
    return [100 + Math.cos(a) * r, 100 + Math.sin(a) * r]
  })

const dot = ([x, y]) => `M${x.toFixed(2)} ${y.toFixed(2)}h.01`
const OUTER = ring(60, 92)
const INNER = ring(36, 72)
const MINOR = OUTER.filter((_, i) => i % 5 !== 0).map(dot).join('')
const MAJOR = OUTER.filter((_, i) => i % 5 === 0).map(dot).join('')
const INNER_PATH = INNER.map(dot).join('')

// "HH:MM" is always 25 columns wide (four 5-wide digits, a 1-wide colon, 4 gaps).
const PITCH = 5
const OX = 100 - (25 * PITCH) / 2
const OY = 100 - (7 * PITCH) / 2
const COLON_COL = 12

/** A round dot-matrix clock: the red dot walks the seconds, digits sit in the middle. */
export default function DotClock({ timeZone }) {
  const { h, m, s } = useClock(timeZone)
  const { on } = layoutText(`${h}:${m}`)
  const digits = toPath(
    on.filter(([x]) => x !== COLON_COL),
    PITCH,
    OX,
    OY,
  )
  const colon = toPath(
    on.filter(([x]) => x === COLON_COL),
    PITCH,
    OX,
    OY,
  )
  const trail = [1, 2, 3].map((k) => dot(OUTER[(s - k + 60) % 60]))

  return (
    <svg
      className="clock"
      viewBox="0 0 200 200"
      role="img"
      aria-label={`Local time ${h}:${m}`}
    >
      <path className="clock-inner" d={INNER_PATH} stroke="currentColor" strokeOpacity=".28" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d={MINOR} stroke="currentColor" strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d={MAJOR} stroke="currentColor" strokeWidth="5.4" strokeLinecap="round" fill="none" />
      {trail.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="var(--red)"
          strokeOpacity={[0.7, 0.45, 0.25][i]}
          strokeWidth={[6.4, 5.4, 4.4][i]}
          strokeLinecap="round"
          fill="none"
        />
      ))}
      <path d={dot(OUTER[s % 60])} stroke="var(--red)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d={digits} stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <path className="blink" d={colon} stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" fill="none" />
    </svg>
  )
}
