export default function filterMenu(root) {
  const buttons = [...root.querySelectorAll('[data-filter]')]
  const grid = root.querySelector('[data-menu-grid]')
  const cards = [...grid.children]
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const select = (button) => {
    buttons.forEach((item) => {
      const active = item === button
      item.classList.toggle('is-selected', active)
      item.setAttribute('aria-pressed', active ? 'true' : 'false')
    })
  }

  const apply = (category) => {
    cards.forEach((card) => {
      const visible = category === 'all' || card.dataset.category === category
      card.classList.toggle('is-hidden', !visible)
    })
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('is-selected') || grid.classList.contains('is-out')) return
      const category = button.dataset.filter
      select(button)
      if (reduce) {
        apply(category)
        return
      }

      const onEnd = (event) => {
        if (event.target !== grid || event.propertyName !== 'opacity') return
        grid.removeEventListener('transitionend', onEnd)
        apply(category)
        grid.classList.remove('is-out')
      }

      grid.addEventListener('transitionend', onEnd)
      grid.classList.add('is-out')
    })
  })
}
