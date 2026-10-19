export default function observeReveals() {
  const nodes = [...document.querySelectorAll('[data-reveal]')]
  if (!nodes.length) return

  const show = (node) => node.classList.add('is-shown')
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    nodes.forEach(show)
    return
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const node = entry.target
      const siblings = [...node.parentElement.querySelectorAll(':scope > [data-reveal]')]
      node.style.transitionDelay = `${siblings.indexOf(node) * 90}ms`
      show(node)
      node.addEventListener('transitionend', () => {
        node.style.transitionDelay = ''
      }, { once: true })
      observer.unobserve(node)
    })
  }, { threshold: 0.22 })

  nodes.forEach((node) => observer.observe(node))
}
