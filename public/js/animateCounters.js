function runCounter(node) {
  const target = Number(node.dataset.counter)
  const started = performance.now()
  const duration = 900

  const frame = (now) => {
    const progress = Math.min((now - started) / duration, 1)
    const eased = 1 - (1 - progress) ** 3
    node.textContent = String(Math.round(target * eased))
    if (progress < 1) requestAnimationFrame(frame)
  }

  requestAnimationFrame(frame)
}

export default function animateCounters() {
  const nodes = [...document.querySelectorAll('[data-counter]')]
  if (!nodes.length) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    nodes.forEach((node) => {
      node.textContent = node.dataset.counter
    })
    return
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      runCounter(entry.target)
      observer.unobserve(entry.target)
    })
  }, { threshold: 0.6 })

  nodes.forEach((node) => observer.observe(node))
}
