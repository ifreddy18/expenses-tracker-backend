"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authErrosCodes = void 0;
const AppCommonErrorCodes_1 = require("./AppCommonErrorCodes");
const authErrosCodes = {
    AUTH_MISSING_TOKEN: (0, AppCommonErrorCodes_1.nextErrorNumber)('AUTH_MISSING_TOKEN', 'There is no token in the request'),
    AUTH_NOT_VALID_TOKEN: (0, AppCommonErrorCodes_1.nextErrorNumber)('AUTH_NOT_VALID_TOKEN', 'Invalid token'),
    AUTH_NOT_VALID_USER: (0, AppCommonErrorCodes_1.nextErrorNumber)('AUTH_NOT_VALID_USER'),
    AUTH_PASSWORD_REQUIRED: (0, AppCommonErrorCodes_1.nextErrorNumber)('AUTH_PASSWORD_REQUIRED', 'The password is required'),
    AUTH_INVALID_PASSWORD: (0, AppCommonErrorCodes_1.nextErrorNumber)('AUTH_INVALID_PASSWORD', 'The password must contain at least 6 characters'),
    AUTH_MISSING_GOOGLE_TOKEN: (0, AppCommonErrorCodes_1.nextErrorNumber)('AUTH_MISSING_GOOGLE_TOKEN'),
    AUTH_NOT_VALID_GOOGLE_TOKEN: (0, AppCommonErrorCodes_1.nextErrorNumber)('AUTH_NOT_VALID_GOOGLE_TOKEN'),
    AUTH_NOT_VALID_CREDENTIALS: (0, AppCommonErrorCodes_1.nextErrorNumber)('AUTH_NOT_VALID_CREDENTIALS', 'User or password are incorrect'),
};
exports.authErrosCodes = authErrosCodes;
//# sourceMappingURL=authErrorManager.js.map