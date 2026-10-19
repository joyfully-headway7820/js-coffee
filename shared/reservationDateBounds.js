import { horizonDays } from './reservationRules.js'

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function reservationDateBounds(now = new Date()) {
  const min = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const max = new Date(min)
  max.setDate(max.getDate() + horizonDays)

  return { min: formatDate(min), max: formatDate(max) }
}
