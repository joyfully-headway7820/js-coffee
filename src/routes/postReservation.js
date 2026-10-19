import addReservation from '../addReservation.js'
import renderReservation from '../renderReservation.js'
import validateReservation from '../../shared/validateReservation.js'

export default function postReservation(req, res) {
  const result = validateReservation(req.body)
  if (!result.ok) {
    renderReservation(res, { errors: result.errors, values: req.body, status: 400 })
    return
  }

  const record = addReservation(result.value)
  res.redirect(303, `/reservation/success/${record.id}`)
}
