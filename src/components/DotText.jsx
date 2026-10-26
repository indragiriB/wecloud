import { useEffect, useMemo, useRef } from 'react'
import { PITCH, layoutText, offDots, toPath } from '../lib/dotFont'

const ON_W = 6.6 // stroke width of a lit dot (viewBox units)
const OFF_W = 3.4 // stroke width of an unlit dot

/**
 * Dot-matrix text drawn as SVG.
 *
 * px          – CSS pixels per dot cell (upper bound unless `fixed`)
 * fixed       – exact size instead of shrinking to fit the container
 * interactive – lit dots swell and turn red near the pointer
 * trackRef    – element whose pointer events drive `interactive`
 *               (defaults to the SVG itself)
 * boot        – lit dots switch on left to right once on load
 */
export default function DotText({
  text,
  px = 6,
  fixed = false,
  interactive = false,
  boot = false,
  trackRef,
  label,
  gap = 1,
  offOpacity = 0.17,
  className = '',
  children,
}) {
  const lay = useMemo(() => layoutText(text, gap), [text, gap])
  const { cols, rows, on } = lay
  const offPath = useMemo(() => toPath(offDots(lay)), [lay])
  const onPath = useMemo(() => (interactive ? '' : toPath(on)), [on, interactive])

  const svgRef = useRef(null)
  const dotRefs = useRef([])

  useEffect(() => {
    if (!interactive) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const svg = svgRef.current
    const host = trackRef?.current || svg
    const coords = on.map(([x, y]) => [x * PITCH + PITCH / 2, y * PITCH + PITCH / 2])
    const R = PITCH * 3.4
    let raf = 0
    let pointer = null
    let lit = new Set()

    const reset = (i) => {
      const el = dotRefs.current[i]
      if (el) {
        el.style.transform = ''
        el.style.fill = ''
        el.style.stroke = ''
        el.style.strokeWidth = ''
      }
    }

    const draw = () => {
      raf = 0
      const next = new Set()
      const m = pointer && svg.getScreenCTM()
      if (m) {
        const p = new DOMPoint(pointer.x, pointer.y).matrixTransform(m.inverse())
        coords.forEach(([cx, cy], i) => {
          const d = Math.hypot(cx - p.x, cy - p.y)
          if (d >= R) return
          const el = dotRefs.current[i]
          if (!el) return
          el.style.transform = `scale(${1 + (1 - d / R) * 1.1})`
          const hot = d < R * 0.55
          el.style.fill = hot ? 'var(--red)' : ''
          el.style.stroke = hot ? 'var(--ink)' : ''
          el.style.strokeWidth = hot ? '1.6' : ''
          next.add(i)
        })
      }
      lit.forEach((i) => {
        if (!next.has(i)) reset(i)
      })
      lit = next
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }
    const move = (e) => {
      pointer = { x: e.clientX, y: e.clientY }
      schedule()
    }
    const leave = () => {
      pointer = null
      schedule()
    }

    host.addEventListener('pointermove', move)
    host.addEventListener('pointerdown', move)
    host.addEventListener('pointerleave', leave)
    host.addEventListener('pointercancel', leave)
    return () => {
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerdown', move)
      host.removeEventListener('pointerleave', leave)
      host.removeEventListener('pointercancel', leave)
      cancelAnimationFrame(raf)
      lit.forEach(reset)
    }
  }, [interactive, on, trackRef])

  const width = cols * px
  const wrapStyle = fixed ? { width } : { width: '100%', maxWidth: width }

  return (
    <div className={`dotwrap ${className}`} style={wrapStyle}>
      <svg
        ref={svgRef}
        className="dotsvg"
        viewBox={`0 0 ${cols * PITCH} ${rows * PITCH}`}
        style={{ aspectRatio: `${cols} / ${rows}` }}
        role={label ? 'img' : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        focusable="false"
      >
        <path
          d={offPath}
          fill="none"
          stroke="currentColor"
          strokeOpacity={offOpacity}
          strokeWidth={OFF_W}
          strokeLinecap="round"
        />
        {interactive ? (
          <g fill="currentColor">
            {on.map(([x, y], i) => (
              <circle
                key={`${x}-${y}`}
                ref={(el) => {
                  dotRefs.current[i] = el
                }}
                className={boot ? 'dot dot-boot' : 'dot'}
                style={boot ? { '--d': `${x * 14 + y * 6}ms` } : undefined}
                cx={x * PITCH + PITCH / 2}
                cy={y * PITCH + PITCH / 2}
                r={ON_W / 2}
              />
            ))}
          </g>
        ) : (
          <path
            d={onPath}
            fill="none"
            stroke="currentColor"
            strokeWidth={ON_W}
            strokeLinecap="round"
          />
        )}
      </svg>
      {children}
    </div>
  )
}
