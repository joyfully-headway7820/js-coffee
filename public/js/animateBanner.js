export default function animateBanner() {
  const nodes = [...document.querySelectorAll('[data-banner-title], [data-banner-slogan]')]
  if (!nodes.length) return
  requestAnimationFrame(() => {
    nodes.forEach((node) => node.classList.add('is-shown'))
  })
}
