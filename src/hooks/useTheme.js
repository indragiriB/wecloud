import { useCallback, useEffect, useState } from 'react'

const COLORS = { light: '#e9e9e6', dark: '#000000' }

export function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', COLORS[theme])
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('theme', next)
      } catch {
        /* storage blocked: the choice just won't persist */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
