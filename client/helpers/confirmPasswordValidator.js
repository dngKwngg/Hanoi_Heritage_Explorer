export function confirmPasswordValidator(confirmPassword, password) {
    if (!confirmPassword) return "Confirm password can't be empty."
    if (confirmPassword !== password) return 'Password and confirm password must be the same.'
    return ''
  }
  