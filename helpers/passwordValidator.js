export function passwordValidator(password) {
  if (!password) return "Password can't be empty."
  if (password.length < 6) return 'Password must be at least 6 characters long.'
  // if (!password.match(/[a-z]/) || !password.match(/[A-Z]/) || !password.match(/[0-9]/)) {
  //   return 'Password must contain uppercase letters, lowercase letters and numbers';
  // }
  return ''
}
