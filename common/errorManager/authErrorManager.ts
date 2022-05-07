import { nextErrorNumber } from './AppCommonErrorCodes'

const authErrosCodes = {
    AUTH_MISSING_TOKEN: nextErrorNumber('AUTH_MISSING_TOKEN', 'There is no token in the request'),
    AUTH_NOT_VALID_TOKEN: nextErrorNumber('AUTH_NOT_VALID_TOKEN', 'Invalid token'),
    AUTH_NOT_VALID_USER: nextErrorNumber('AUTH_NOT_VALID_USER'),
    AUTH_PASSWORD_REQUIRED: nextErrorNumber('AUTH_PASSWORD_REQUIRED', 'The password is required'),
    AUTH_INVALID_PASSWORD: nextErrorNumber('AUTH_INVALID_PASSWORD', 'The password must contain at least 6 characters'),
    AUTH_MISSING_GOOGLE_TOKEN: nextErrorNumber('AUTH_MISSING_GOOGLE_TOKEN'),
    AUTH_NOT_VALID_GOOGLE_TOKEN: nextErrorNumber('AUTH_NOT_VALID_GOOGLE_TOKEN'),
    AUTH_NOT_VALID_CREDENTIALS: nextErrorNumber('AUTH_NOT_VALID_CREDENTIALS', 'User or password are incorrect'),
};

export {
    authErrosCodes
}