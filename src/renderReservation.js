import buildTimeSlots from '../shared/buildTimeSlots.js'
import reservationDateBounds from '../shared/reservationDateBounds.js'

export default function renderReservation(res, { errors = {}, values = {}, status = 200 } = {}) {
  const bounds = reservationDateBounds()
  res.status(status).render('reservation', {
    title: 'Бронирование',
    page: 'reservation',
    path: '/reservation',
    errors,
    values,
    slots: buildTimeSlots(),
    minDate: bounds.min,
    maxDate: bounds.max,
  })
}
