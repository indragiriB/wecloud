import DotText from './DotText'
import { layoutText } from '../lib/dotFont'

const PX = 8

/** Section heading drawn in dots. `label` is what screen readers get. */
export default function SectionHead({ id, title, label, meta }) {
  const { cols } = layoutText(title)
  return (
    <header className="sec-head">
      <h2 id={id} style={{ width: cols * PX, maxWidth: '100%' }}>
        <DotText text={title} px={PX} label={label || title} />
      </h2>
      {meta && <p className="sec-meta">{meta}</p>}
    </header>
  )
}
