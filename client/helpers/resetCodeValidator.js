

export function resetCodeValidator(resetCode) {
    if (!resetCode) { return "Mã xác thực không thể bỏ trống."; }
    // if (resetCode.length !== 5) { return 'The verification code must have 5 characters.'; }
    return '';
}