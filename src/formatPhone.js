export default function formatPhone(phone) {
  const digits = phone.replace(/\D/g, '').slice(-10)
  return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8)}`
}
