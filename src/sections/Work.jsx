import ProjectImage from '../components/ProjectImage'
import SectionHead from '../components/SectionHead'
import { useActiveSection } from '../hooks/useActiveSection'

function Project({ p, ui }) {
  return (
    <li id={`p-${p.id}`} className="proj glass">
      <ProjectImage
        src={p.image}
        alt={p.imageAlt || p.title}
        ratio="32 / 15"
        size="1600 × 800"
        hint={ui.placeholder}
      />
      <div className="proj-body">
        <div className="proj-head">
          <h3>{p.title}</h3>
          <p className="proj-meta">
            <span>{p.type}</span>
            <span>{p.year}</span>
          </p>
        </div>
        <div className="proj-text">
          <p>{p.description}</p>
          <p className="proj-role">
            <span>{ui.role}</span> {p.role}
          </p>
          <ul className="chips" aria-label={ui.builtWith}>
            {p.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="links">
            {p.links.live && (
              <a className="btn btn-sm" href={p.links.live} target="_blank" rel="noreferrer noopener">
                {ui.live} ↗<span className="sr-only"> {ui.for} {p.title}</span>
              </a>
            )}
            {p.links.code && (
              <a className="btn btn-sm" href={p.links.code} target="_blank" rel="noreferrer noopener">
                {ui.source} ↗<span className="sr-only"> {ui.for} {p.title}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export default function Work({ site }) {
  const { ui } = site
  const n = site.projects.length
  const ids = site.projects.map((p) => `p-${p.id}`)
  const active = useActiveSection(ids)

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHead id="work-title" title="Proyek" label="Proyek pilihan" meta={`${n} proyek pilihan`} />
        <div className="work-grid">
          <nav className="index glass" aria-label={ui.jumpTo}>
            <ul>
              {site.projects.map((p) => (
                <li key={p.id}>
                  <a href={`#p-${p.id}`} aria-current={active === `p-${p.id}` ? 'true' : undefined}>
                    <span className="pip" aria-hidden="true" />
                    <span className="ix-title">{p.title}</span>
                    <span className="ix-year">{p.year}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ol className="projects">
            {site.projects.map((p) => (
              <Project key={p.id} p={p} ui={ui} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
