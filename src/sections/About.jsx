import ProjectImage from '../components/ProjectImage'
import SectionHead from '../components/SectionHead'

function Meter({ name, level }) {
  const dots = Array.from({ length: 10 }, (_, i) => i)
  return (
    <li className="meter" aria-label={`${name}: ${level} out of 10`}>
      <div className="meter-top">
        <span>{name}</span>
        <span aria-hidden="true">{level}/10</span>
      </div>
      <div className="meter-dots" aria-hidden="true">
        {dots.map((i) => (
          <i key={i} className={i < level ? (i === level - 1 ? 'on tip' : 'on') : ''} />
        ))}
      </div>
    </li>
  )
}

export default function About({ site }) {
  const a = site.about
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead id="about-title" title="About" label="About me" />

        <div className="sheet glass">
          <div className="sheet-side">
            <ProjectImage
              src={a.photo}
              alt={`Portrait of ${site.name}`}
              ratio="1 / 1"
              size="1200 × 1200"
              round
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
                <h3 className="block-title">Skills</h3>
                <ul className="meters">
                  {a.skills.map((s) => (
                    <Meter key={s.name} {...s} />
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="block-title">Experience</h3>
                <ul className="timeline">
                  {a.timeline.map((t) => (
                    <li key={t.title}>
                      <span className="when">{t.when}</span>
                      <strong>{t.title}</strong>
                      <p>{t.text}</p>
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
