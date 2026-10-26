import ProjectImage from '../components/ProjectImage'
import SectionHead from '../components/SectionHead'
import { useActiveSection } from '../hooks/useActiveSection'

function Project({ p }) {
  return (
    <li id={`p-${p.id}`} className="proj glass">
      <ProjectImage src={p.image} alt={`${p.title} screenshot`} />
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
            <span>Role</span> {p.role}
          </p>
          <ul className="chips" aria-label="Built with">
            {p.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="links">
            {p.links.live && (
              <a className="btn btn-sm" href={p.links.live} target="_blank" rel="noreferrer noopener">
                Live site ↗<span className="sr-only"> for {p.title}</span>
              </a>
            )}
            {p.links.code && (
              <a className="btn btn-sm" href={p.links.code} target="_blank" rel="noreferrer noopener">
                Source ↗<span className="sr-only"> for {p.title}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export default function Work({ site }) {
  const n = site.projects.length
  const ids = site.projects.map((p) => `p-${p.id}`)
  const active = useActiveSection(ids)

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHead
          id="work-title"
          title="Work"
          label="Selected work"
          meta={`${n} selected ${n === 1 ? 'project' : 'projects'}`}
        />
        <div className="work-grid">
          <nav className="index glass" aria-label="Jump to project">
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
              <Project key={p.id} p={p} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
