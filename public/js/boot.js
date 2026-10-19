import animateBanner from './animateBanner.js'
import animateCounters from './animateCounters.js'
import bindReservationForm from './bindReservationForm.js'
import filterMenu from './filterMenu.js'
import markActiveNav from './markActiveNav.js'
import observeReveals from './observeReveals.js'

function boot() {
  markActiveNav()
  animateBanner()
  observeReveals()
  animateCounters()

  const menu = document.querySelector('[data-menu]')
  if (menu) filterMenu(menu)

  const form = document.querySelector('[data-reservation-form]')
  if (form) bindReservationForm(form)
}

boot()
