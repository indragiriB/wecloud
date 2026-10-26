import { useRef } from 'react'
import DotText from '../components/DotText'
import DotClock from '../components/DotClock'

export default function Hero({ site }) {
  const ref = useRef(null)
  const lines = site.name.trim().split(/\s+/).join('\n')
  const tz = site.timezone

  return (
    <section id="home" className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <h1 id="hero-title" className="sr-only">
          {site.name}, {site.role}
        </h1>

        <DotText text={lines} px={25} gap={2} interactive boot trackRef={ref} className="hero-name" />

        <div className="hero-lower">
          <div className="intro glass">
            <p className="status">
              <i aria-hidden="true" />
              {site.hero.status}
            </p>
            <p className="role">{site.role}</p>
            <p className="blurb">{site.intro}</p>
            <div className="cta">
              <a className="btn btn-red" href="#work">
                View my work
              </a>
              <a className="btn" href="#contact">
                Get in touch
              </a>
            </div>
          </div>

          <aside className="lens-col" aria-label="At a glance">
            <div className="lens glass">
              <DotClock timeZone={tz} />
              <p className="lens-cap">{tz.replace(/_/g, ' ')}</p>
            </div>
            <dl className="facts glass">
              {site.hero.facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  )
}
