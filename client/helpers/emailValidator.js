export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Email không thể bỏ trống."
  if (!re.test(email)) return 'Ou, chúng tôi cần một email hợp lệ.'
  return ''
}
