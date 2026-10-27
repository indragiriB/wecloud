import DotText from './DotText'
import { asset } from '../lib/asset'

/**
 * Project image. With no `src` it shows a dot-matrix placeholder with crop
 * marks. With a `src` it shows the picture, cropped to fit.
 */
export default function ProjectImage({
  src,
  alt,
  ratio = '16 / 10',
  size = '1600 × 800',
  round = false,
  hint = 'placeholder',
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
    <div className={cls} style={{ aspectRatio: ratio }} role="img" aria-label={`${alt} (${hint})`}>
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
