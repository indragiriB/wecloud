import DotText from './DotText'
import { asset } from '../lib/asset'

/**
 * Project image. With no `src` it shows a dot-matrix placeholder with crop
 * marks. With a `src` the picture sits under a frosted film that clears on
 * hover (only on devices that can hover, so touch screens always see it sharp).
 */
export default function ProjectImage({
  src,
  alt,
  ratio = '16 / 10',
  size = '1600 × 1000',
  round = false,
}) {
  const cls = `shot${src ? ' has-img' : ''}${round ? ' round' : ''}`

  if (src) {
    return (
      <div className={cls} style={{ aspectRatio: ratio }}>
        <img src={asset(src)} alt={alt} loading="lazy" decoding="async" />
      </div>
    )
  }

  return (
    <div className={cls} style={{ aspectRatio: ratio }} role="img" aria-label={`${alt} (placeholder)`}>
      <i className="cm tl" />
      <i className="cm tr" />
      <i className="cm bl" />
      <i className="cm br" />
      <div className="shot-tag">
        <DotText text="IMG" px={round ? 7 : 10} />
        <span>{size}</span>
      </div>
    </div>
  )
}
