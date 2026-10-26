import { useEffect, useRef, useState } from 'react'

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for insecure contexts / older browsers.
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0'
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    document.body.removeChild(ta)
    return ok
  }
}

export default function CopyButton({ text, label = 'Copy email' }) {
  const [state, setState] = useState('idle') // idle | done | failed
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  const onClick = async () => {
    setState((await copy(text)) ? 'done' : 'failed')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState('idle'), 2000)
  }

  return (
    <>
      <button type="button" className="btn" onClick={onClick}>
        {state === 'done' ? 'Copied' : state === 'failed' ? 'Copy failed' : label}
      </button>
      <span className="sr-only" role="status">
        {state === 'done' ? 'Email address copied' : state === 'failed' ? 'Could not copy' : ''}
      </span>
    </>
  )
}
