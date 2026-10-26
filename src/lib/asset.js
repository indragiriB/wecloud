/**
 * Turns "/projects/shop.jpg" into a URL that also works when the site is
 * served from a sub-path (e.g. https://you.github.io/your-repo/).
 * External URLs (https://…, data:…) are returned untouched.
 */
export function asset(path) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path
  const base = import.meta.env?.BASE_URL ?? './'
  return base.replace(/\/?$/, '/') + path.slice(1)
}
