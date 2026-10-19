import validateReservation from './validateReservation.js'

function shake(control) {
  control.classList.remove('shake')
  void control.offsetWidth
  control.classList.add('shake')
  control.addEventListener('animationend', () => {
    control.classList.remove('shake')
  }, { once: true })
}

function showError(field, message) {
  field.classList.add('is-invalid')
  const error = field.querySelector('[data-error]')
  if (error) error.textContent = message
  const control = field.querySelector('input, select, textarea')
  if (control) shake(control)
}

export default function bindReservationForm(form) {
  form.querySelectorAll('.is-invalid input, .is-invalid select, .is-invalid textarea').forEach(shake)

  form.addEventListener('input', (event) => {
    const field = event.target.closest('[data-field]')
    if (!field) return
    field.classList.remove('is-invalid')
    const error = field.querySelector('[data-error]')
    if (error) error.textContent = ''
  })

  form.addEventListener('submit', (event) => {
    const result = validateReservation(Object.fromEntries(new FormData(form)))
    form.querySelectorAll('[data-field]').forEach((field) => {
      field.classList.remove('is-invalid')
      const error = field.querySelector('[data-error]')
      if (error) error.textContent = ''
    })
    if (result.ok) return

    event.preventDefault()
    Object.entries(result.errors).forEach(([name, message]) => {
      const field = form.querySelector(`[data-field="${name}"]`)
      if (field) showError(field, message)
    })
    const first = form.querySelector('.is-invalid input, .is-invalid select, .is-invalid textarea')
    if (first) first.focus()
  })
}
