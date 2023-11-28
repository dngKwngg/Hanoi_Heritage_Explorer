

export function resetCodeValidator(resetCode) {
    if (!resetCode) { return "Reset code can't be empty."; }
    // if (resetCode.length !== 5) { return 'The verification code must have 5 characters.'; }
    return '';
}