export function confirmPasswordValidator(confirmPassword, password) {
    if (!confirmPassword) return "Trường gõ lại mật khẩu không thể bỏ trống."
    if (confirmPassword !== password) return 'Mật khẩu và gõ lại mật khẩu phải giống nhau.'
    return ''
  }
  