import SectionHead from '../components/SectionHead'

export default function Services({ site }) {
  const s = site.services
  const { ui } = site
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="wrap">
        <SectionHead id="services-title" title="Layanan" label="Layanan" meta={s.meta} />

        <div className="svc glass">
          <ul className="svc-list">
            {s.items.map((it) => (
              <li key={it.name}>
                <h3>{it.name}</h3>
                <p>{it.text}</p>
                <ul className="chips" aria-label={ui.suitedFor}>
                  {it.fits.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className="process glass">
          <h3 className="block-title">{s.process.title}</h3>
          <ol className="steps">
            {s.process.steps.map((st, i) => (
              <li key={st.title}>
                <span className="step-n" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <strong>{st.title}</strong>
                  <p>{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
