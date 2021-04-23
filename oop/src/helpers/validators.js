export const bcPostalCodeValidator = (value) => {
    const criteria = RegExp('^[Vv]\\d[A-Za-z][ ]?\\d[A-Za-z]\\d$');
    return criteria.test(value);
};
export const postalCodeValidator = (value) => {
    const criteria = RegExp('^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY][0-9][abceghjklmnprstvwxyzABCEGHJKLMNPRSTVWXYZ] {0,1}[0-9][abceghjklmnprstvwxyzABCEGHJKLMNPRSTVWXYZ][0-9]$');
    return criteria.test(value);
};
export const nonBCValidator = (value) => {
    return (value !== 'BC');
};
export const hasEmptyPostalCode = (value) => {
    return (value === null || value === '');
};
export const invalidCharValidator = (value) => {
    if (!hasEmptyPostalCode(value)){
        const criteria = RegExp('^(?=.*[a-zA-Z0-9])[a-zA-Z0-9 ]*$');
        return criteria.test(value);
    }
    return true;
};
export const nonBCPostalCodeValidator = (value) => {
    if (!hasEmptyPostalCode(value)){
        const criteria = RegExp('^[Vv]\\d[A-Za-z][ ]?\\d[A-Za-z]\\d$');
        return !criteria.test(value);
    }
    return true;
};
export const canadaPostalCodeLengthValidator = (value) => {
    if (!hasEmptyPostalCode(value)){
        const CANADIAN_POSTAL_CODE_LENGTH = 7; // including the space
        return (value.length === CANADIAN_POSTAL_CODE_LENGTH);
    }
    return true;
};
