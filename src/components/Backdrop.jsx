import { useRef } from 'react'
import { useBackdrop } from '../hooks/useBackdrop'

// One waypoint per section (home, work, about, contact).
const STOPS = [
  { x: 74, y: 34, s: 1 },
  { x: 10, y: 56, s: 0.8 },
  { x: 90, y: 40, s: 0.95 },
  { x: 50, y: 72, s: 1.5 },
]

const RING = Array.from({ length: 96 }, (_, i) => {
  const a = (i / 96) * Math.PI * 2
  return `M${(100 + Math.cos(a) * 97).toFixed(2)} ${(100 + Math.sin(a) * 97).toFixed(2)}h.01`
}).join('')

/**
 * Fixed layer that sits behind the page. The frosted panes blur whatever is
 * under them, so this is what gives the glass something to work on.
 */
export default function Backdrop({ ids }) {
  const ref = useRef(null)
  useBackdrop(ref, ids, STOPS)

  return (
    <div className="backdrop" ref={ref} aria-hidden="true">
      <div className="disc-wrap">
        <div className="disc" />
        <svg className="ring" viewBox="0 0 200 200" focusable="false">
          <path d={RING} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </div>
      <div className="pills">
        <i />
        <i />
        <i />
      </div>
    </div>
  )
}
