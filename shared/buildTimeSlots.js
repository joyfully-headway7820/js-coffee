import { dayEndMinute, dayStartMinute, slotMinutes } from './reservationRules.js'

export default function buildTimeSlots() {
  const slots = []

  for (let minute = dayStartMinute; minute <= dayEndMinute; minute += slotMinutes) {
    const hours = String(Math.floor(minute / 60)).padStart(2, '0')
    const minutes = String(minute % 60).padStart(2, '0')
    slots.push(`${hours}:${minutes}`)
  }

  return slots
}
