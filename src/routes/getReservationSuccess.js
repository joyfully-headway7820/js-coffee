import findReservation from '../findReservation.js'
import formatPhone from '../formatPhone.js'
import formatReservationDate from '../formatReservationDate.js'
import pluralGuests from '../pluralGuests.js'

export default function getReservationSuccess(req, res, next) {
  const id = Number(req.params.id)
  const reservation = findReservation(id)
  if (!reservation) {
    next()
    return
  }

  res.render('reservation-success', {
    title: 'Бронь принята',
    page: 'reservation-success',
    path: '/reservation',
    reservation: {
      ...reservation,
      phoneLabel: formatPhone(reservation.phone),
      dateLabel: formatReservationDate(reservation.date),
      guestsLabel: pluralGuests(reservation.guests),
    },
  })
}
