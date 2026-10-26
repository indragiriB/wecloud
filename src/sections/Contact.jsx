import CopyButton from '../components/CopyButton'
import SectionHead from '../components/SectionHead'

export default function Contact({ site }) {
  const c = site.contact
  return (
    <section id="contact" className="section last" aria-labelledby="contact-title">
      <div className="wrap">
        <SectionHead id="contact-title" title="Contact" label="Contact" />

        <div className="contact glass">
          <div>
            <p className="contact-blurb">{c.blurb}</p>
            <a className="email-big" href={`mailto:${c.email}`}>
              {c.email}
            </a>
            <div className="row">
              <a className="btn btn-red" href={`mailto:${c.email}`}>
                Write an email
              </a>
              <CopyButton text={c.email} />
            </div>
          </div>

          <ul className="socials">
            {c.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer noopener">
                  <span className="s-top">
                    <span>{s.label}</span>
                    <span className="arr" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                  <span className="handle">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
