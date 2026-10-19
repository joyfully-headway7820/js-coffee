import reservations from './reservations.js'

export default function findReservation(id) {
  return reservations.find((item) => item.id === id) || null
}
