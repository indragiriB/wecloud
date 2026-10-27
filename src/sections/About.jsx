import ProjectImage from '../components/ProjectImage'
import SectionHead from '../components/SectionHead'

export default function About({ site }) {
  const a = site.about
  const { ui } = site
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead id="about-title" title="Tentang" label="Tentang kami" />

        <div className="sheet glass">
          <div className="sheet-side">
            <ProjectImage
              src={a.photo}
              alt={a.photoAlt}
              ratio="1 / 1"
              size="1200 × 1200"
              round
              hint={ui.placeholder}
            />
            <dl className="facts">
              {a.facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="sheet-main">
            <p className="lede">{a.lede}</p>
            <div className="about-text">
              {a.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>

            <div className="duo">
              <div>
                <h3 className="block-title">{a.techTitle}</h3>
                <ul className="tech">
                  {a.tech.map((g) => (
                    <li key={g.name}>
                      <span className="tech-name">{g.name}</span>
                      <ul className="chips">
                        {g.items.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="block-title">{a.principlesTitle}</h3>
                <ul className="points">
                  {a.principles.map((p) => (
                    <li key={p.title}>
                      <strong>{p.title}</strong>
                      <p>{p.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
