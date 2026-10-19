import buildTimeSlots from './buildTimeSlots.js'
import reservationDateBounds from './reservationDateBounds.js'
import { commentMax, guestMax, guestMin } from './reservationRules.js'

const namePattern = /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё\s-]{1,59}$/

function readText(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizePhone(value) {
  const compact = readText(value).replace(/[\s()-]/g, '')
  if (/^\+7\d{10}$/.test(compact)) return compact
  if (/^8\d{10}$/.test(compact)) return `+7${compact.slice(1)}`
  if (/^7\d{10}$/.test(compact)) return `+${compact}`
  return compact
}

function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const sameDay = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
  return sameDay ? date : null
}

export default function validateReservation(body = {}) {
  const errors = {}
  const name = readText(body.name)
  const phone = normalizePhone(body.phone)
  const date = readText(body.date)
  const time = readText(body.time)
  const comment = readText(body.comment)
  const guestsRaw = readText(String(body.guests ?? ''))
  const guests = Number(guestsRaw)
  const slots = buildTimeSlots()
  const bounds = reservationDateBounds()
  const parsedDate = parseDate(date)

  if (!namePattern.test(name))
    errors.name = 'Имя: от 2 до 60 букв, можно пробел и дефис.'

  if (!/^\+7\d{10}$/.test(phone))
    errors.phone = 'Телефон в формате +7 и 10 цифр.'

  if (!parsedDate || date < bounds.min || date > bounds.max)
    errors.date = 'Дата: сегодня или в пределах 60 дней.'

  if (!slots.includes(time))
    errors.time = 'Выберите время работы зала: с 08:00 до 21:30.'

  if (!Number.isInteger(guests) || guests < guestMin || guests > guestMax)
    errors.guests = `Гостей: целое число от ${guestMin} до ${guestMax}.`

  if (comment.length > commentMax)
    errors.comment = `Комментарий короче ${commentMax} символов.`

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    value: { name, phone, date, time, guests, comment },
  }
}
