export default function pluralGuests(count) {
  const mod100 = Math.abs(count) % 100
  const mod10 = mod100 % 10
  if (mod100 > 10 && mod100 < 20) return `${count} гостей`
  if (mod10 === 1) return `${count} гость`
  if (mod10 >= 2 && mod10 <= 4) return `${count} гостя`
  return `${count} гостей`
}
