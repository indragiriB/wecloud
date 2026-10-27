import CopyButton from '../components/CopyButton'
import SectionHead from '../components/SectionHead'

export default function Contact({ site }) {
  const c = site.contact
  const { ui } = site
  const wa = c.whatsapp
    ? `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.whatsappText || '')}`
    : null

  return (
    <section id="contact" className="section last" aria-labelledby="contact-title">
      <div className="wrap">
        <SectionHead id="contact-title" title="Kontak" label="Kontak" />

        <div className="contact glass">
          <div>
            <p className="contact-blurb">{c.blurb}</p>
            <a className="email-big" href={`mailto:${c.email}`}>
              {c.email}
            </a>
            <div className="row">
              {wa && (
                <a className="btn btn-red" href={wa} target="_blank" rel="noreferrer noopener">
                  {ui.whatsapp} ↗
                </a>
              )}
              <a className={`btn${wa ? '' : ' btn-red'}`} href={`mailto:${c.email}`}>
                {ui.writeEmail}
              </a>
              <CopyButton text={c.email} ui={ui} />
            </div>
          </div>

          <ul className="socials">
            {c.socials.map((s) => (
              <li key={s.label}>
                {s.href ? (
                  <a href={s.href} target="_blank" rel="noreferrer noopener">
                    <span className="s-top">
                      <span>{s.label}</span>
                      <span className="arr" aria-hidden="true">
                        ↗
                      </span>
                    </span>
                    <span className="handle">{s.handle}</span>
                  </a>
                ) : (
                  <div className="tile">
                    <span className="s-top">
                      <span>{s.label}</span>
                    </span>
                    <span className="handle">{s.handle}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
