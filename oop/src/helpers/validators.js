export const bcPostalCodeValidator = (value) => {
    const criteria = RegExp('^[Vv]\\d[ABCEGHJ-NPRSTV-Zabceghj-nprstv-z][ ]?\\d[ABCEGHJ-NPRSTV-Zabceghj-nprstv-z]\\d$');
    return criteria.test(value);
};
export const postalCodeValidator = (value) => {
    const criteria = RegExp('^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY][0-9][abceghjklmnprstvwxyzABCEGHJKLMNPRSTVWXYZ] {0,1}[0-9][abceghjklmnprstvwxyzABCEGHJKLMNPRSTVWXYZ][0-9]$');
    return criteria.test(value);
};
export const invalidCharValidator = (value) => {
    const criteria = RegExp('^(?=.*[a-zA-Z0-9])[a-zA-Z0-9 ]*$');
    return criteria.test(value);
};
export const nonBCValidator = (value) => {
    return (value !== 'British Columbia');
};
export const nonBCPostalCodeValidator = (value) => {
    const criteria = RegExp('^[Vv]\\d[ABCEGHJ-NPRSTV-Zabceghj-nprstv-z][ ]?\\d[ABCEGHJ-NPRSTV-Zabceghj-nprstv-z]\\d$');
    return !criteria.test(value);
};
