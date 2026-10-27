import { useEffect, useRef, useState } from 'react'
import DotText from './DotText'

export default function Header({ nav, active, theme, onToggleTheme, initials, ui }) {
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    const onResize = () => window.innerWidth > 860 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className="header">
      <div className="bar glass">
        <a className="logo" href="#home" aria-label={ui.backToTop} onClick={() => setOpen(false)}>
          <DotText text={initials} px={4} fixed />
          <i aria-hidden="true" />
        </a>

        <nav className="nav" aria-label={ui.primaryNav}>
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} aria-current={active === n.id ? 'true' : undefined}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="bar-actions">
          <button
            type="button"
            className="mode"
            aria-pressed={theme === 'dark'}
            aria-label={theme === 'dark' ? ui.toLight : ui.toDark}
            onClick={onToggleTheme}
          >
            <span aria-hidden="true" />
          </button>
          <button
            ref={btnRef}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? ui.close : ui.menu}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="mmenu glass" aria-label={ui.mobileNav}>
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {n.label}
              <span aria-hidden="true">↓</span>
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
