import DotText from './DotText'
import { layoutText } from '../lib/dotFont'

const PX = 8
const PAD = 18 // horizontal padding of the frosted plate, keep in sync with styles.css

/** Section heading drawn in dots. `label` is what screen readers get. */
export default function SectionHead({ id, title, label, meta }) {
  const { cols } = layoutText(title)
  return (
    <header className="sec-head">
      <h2 id={id} className="glass" style={{ width: cols * PX + PAD * 2 + 2, maxWidth: '100%' }}>
        <DotText text={title} px={PX} label={label || title} />
      </h2>
      {meta && <p className="sec-meta">{meta}</p>}
    </header>
  )
}
