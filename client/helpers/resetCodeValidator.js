

export function resetCodeValidator(resetCode) {
    if (!resetCode) { return "Reset code can't be empty."; }
    if (isNaN(resetCode)) {
        console.log('not a number');
        return 'The reset code must be a 4-digit number.';
    }
    if (resetCode.length !== 4) { return 'The reset code must be 4 digits.'; }
    return '';
}