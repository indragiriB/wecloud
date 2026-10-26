// A tiny 5x7 dot-matrix font. '#' = lit dot, '.' = unlit.
// Glyphs may be narrower than 5 columns (punctuation). All rows of a glyph
// must be the same length and every glyph must have 7 rows.

export const ROWS = 7
export const PITCH = 10 // SVG units between dot centres

const RAW = {
  A: '.###.|#...#|#...#|#####|#...#|#...#|#...#',
  B: '####.|#...#|#...#|####.|#...#|#...#|####.',
  C: '.###.|#...#|#....|#....|#....|#...#|.###.',
  D: '####.|#...#|#...#|#...#|#...#|#...#|####.',
  E: '#####|#....|#....|####.|#....|#....|#####',
  F: '#####|#....|#....|####.|#....|#....|#....',
  G: '.###.|#...#|#....|#.###|#...#|#...#|.###.',
  H: '#...#|#...#|#...#|#####|#...#|#...#|#...#',
  I: '.###.|..#..|..#..|..#..|..#..|..#..|.###.',
  J: '..###|...#.|...#.|...#.|...#.|#..#.|.##..',
  K: '#...#|#..#.|#.#..|##...|#.#..|#..#.|#...#',
  L: '#....|#....|#....|#....|#....|#....|#####',
  M: '#...#|##.##|#.#.#|#.#.#|#...#|#...#|#...#',
  N: '#...#|##..#|#.#.#|#..##|#...#|#...#|#...#',
  O: '.###.|#...#|#...#|#...#|#...#|#...#|.###.',
  P: '####.|#...#|#...#|####.|#....|#....|#....',
  Q: '.###.|#...#|#...#|#...#|#.#.#|#..#.|.##.#',
  R: '####.|#...#|#...#|####.|#.#..|#..#.|#...#',
  S: '.####|#....|#....|.###.|....#|....#|####.',
  T: '#####|..#..|..#..|..#..|..#..|..#..|..#..',
  U: '#...#|#...#|#...#|#...#|#...#|#...#|.###.',
  V: '#...#|#...#|#...#|#...#|#...#|.#.#.|..#..',
  W: '#...#|#...#|#...#|#.#.#|#.#.#|##.##|#...#',
  X: '#...#|#...#|.#.#.|..#..|.#.#.|#...#|#...#',
  Y: '#...#|#...#|.#.#.|..#..|..#..|..#..|..#..',
  Z: '#####|....#|...#.|..#..|.#...|#....|#####',
  0: '.###.|#...#|#..##|#.#.#|##..#|#...#|.###.',
  1: '..#..|.##..|..#..|..#..|..#..|..#..|.###.',
  2: '.###.|#...#|....#|...#.|..#..|.#...|#####',
  3: '#####|...#.|..#..|...#.|....#|#...#|.###.',
  4: '...#.|..##.|.#.#.|#..#.|#####|...#.|...#.',
  5: '#####|#....|####.|....#|....#|#...#|.###.',
  6: '..##.|.#...|#....|####.|#...#|#...#|.###.',
  7: '#####|....#|...#.|..#..|.#...|.#...|.#...',
  8: '.###.|#...#|#...#|.###.|#...#|#...#|.###.',
  9: '.###.|#...#|#...#|.####|....#|...#.|.##..',
  '.': '..|..|..|..|..|##|##',
  ',': '..|..|..|..|.#|.#|#.',
  '!': '#|#|#|#|#|.|#',
  '?': '.###.|#...#|....#|...#.|..#..|.....|..#..',
  ':': '.|.|#|.|#|.|.',
  '-': '....|....|....|####|....|....|....',
  '+': '.....|..#..|..#..|#####|..#..|..#..|.....',
  '/': '....#|....#|...#.|..#..|.#...|#....|#....',
  '@': '.###.|#...#|#.###|#.#.#|#.###|#....|.####',
  '&': '.##..|#..#.|#.#..|.#...|#.#.#|#..#.|.##.#',
  '(': '..#|.#.|#..|#..|#..|.#.|..#',
  ')': '#..|.#.|..#|..#|..#|.#.|#..',
  '_': '.....|.....|.....|.....|.....|.....|#####',
  '*': '.....|#.#.#|.###.|#####|.###.|#.#.#|.....',
  '#': '.#.#.|.#.#.|#####|.#.#.|#####|.#.#.|.#.#.',
  "'": '#|#|#|.|.|.|.',
  '"': '#.#|#.#|#.#|...|...|...|...',
  '=': '.....|.....|#####|.....|#####|.....|.....',
  '>': '#....|.#...|..#..|...#.|..#..|.#...|#....',
  '<': '....#|...#.|..#..|.#...|..#..|...#.|....#',
}

export const GLYPHS = Object.fromEntries(
  Object.entries(RAW).map(([k, v]) => [k, v.split('|')]),
)

const SPACE = 3
const DEFAULT_GAP = 1
const LINE_GAP = 2

const cache = new Map()

/**
 * Lay out text (use \n for several lines) on a dot grid.
 * Returns { on: [[col,row],...], cols, rows }.
 */
export function layoutText(text, GAP = DEFAULT_GAP) {
  const key = `${GAP}|${text}`
  if (cache.has(key)) return cache.get(key)

  const lines = String(text)
    .toUpperCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .split('\n')

  const placed = lines.map((line) => {
    const cells = []
    let x = 0
    for (const ch of line) {
      if (ch === ' ') {
        x += SPACE
        continue
      }
      const g = GLYPHS[ch] || GLYPHS['?']
      const w = g[0].length
      for (let y = 0; y < ROWS; y++)
        for (let i = 0; i < w; i++) if (g[y][i] === '#') cells.push([x + i, y])
      x += w + GAP
    }
    return { cells, width: Math.max(1, x - GAP) }
  })

  const cols = Math.max(...placed.map((l) => l.width))
  const rows = lines.length * ROWS + (lines.length - 1) * LINE_GAP
  const on = []
  placed.forEach((l, li) =>
    l.cells.forEach(([x, y]) => on.push([x, y + li * (ROWS + LINE_GAP)])),
  )

  const out = { on, cols, rows }
  cache.set(key, out)
  return out
}

/** Every grid position that is not lit (the faint "unlit pixels"). */
export function offDots({ on, cols, rows }) {
  const lit = new Set(on.map(([x, y]) => y * cols + x))
  const off = []
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) if (!lit.has(y * cols + x)) off.push([x, y])
  return off
}

/**
 * One SVG path that draws every point as a round dot
 * (zero-length segments with round line caps).
 */
export function toPath(points, pitch = PITCH, ox = 0, oy = 0) {
  const h = pitch / 2
  return points
    .map(([x, y]) => `M${x * pitch + h + ox} ${y * pitch + h + oy}h.01`)
    .join('')
}
