import { useEffect } from 'react'
import site from './data'
import Backdrop from './components/Backdrop'
import Header from './components/Header'
import Hero from './sections/Hero'
import Work from './sections/Work'
import Services from './sections/Services'
import About from './sections/About'
import Contact from './sections/Contact'
import { useTheme } from './hooks/useTheme'
import { useActiveSection } from './hooks/useActiveSection'

const IDS = site.nav.map((n) => n.id)

export default function App() {
  const { theme, toggle } = useTheme()
  const active = useActiveSection(IDS)

  useEffect(() => {
    document.title = `${site.name}: ${site.role}`
  }, [])

  return (
    <>
      <Backdrop ids={IDS} />
      <a className="skip" href="#work">
        {site.ui.skip}
      </a>
      <Header
        nav={site.nav}
        active={active}
        theme={theme}
        onToggleTheme={toggle}
        initials={site.initials}
        ui={site.ui}
      />
      <main>
        <Hero site={site} />
        <Work site={site} />
        <Services site={site} />
        <About site={site} />
        <Contact site={site} />
      </main>
      <footer className="footer">
        <div className="wrap">
          <span>
            © {new Date().getFullYear()} {site.name}, Solo
          </span>
          <a href="#home">{site.ui.backToTop} ↑</a>
        </div>
      </footer>
    </>
  )
}
