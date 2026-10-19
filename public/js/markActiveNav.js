function matches(href, path) {
  if (href === '/') return path === '/'
  return path === href || path.startsWith(`${href}/`)
}

export default function markActiveNav() {
  const path = window.location.pathname
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (!matches(link.getAttribute('href'), path)) return
    requestAnimationFrame(() => link.classList.add('is-active'))
  })
}
