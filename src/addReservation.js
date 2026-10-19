import reservations from './reservations.js'

let nextId = 1

export default function addReservation(value) {
  const record = {
    id: nextId,
    ...value,
    createdAt: new Date().toISOString(),
  }
  nextId += 1
  reservations.push(record)
  console.log('Бронь сохранена:', record)
  return record
}
