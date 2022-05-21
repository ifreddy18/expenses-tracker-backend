"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonErrorsCodes = exports.WITHOUT_ERRORS = exports.buildErrorDataContainer = exports.getErrorMessage = exports.getErrorName = exports.nextErrorNumber = void 0;
const CommonErrorDataContainer_1 = require("./CommonErrorDataContainer");
let currentErrorNumber = 1000;
const WITHOUT_ERRORS = 0;
exports.WITHOUT_ERRORS = WITHOUT_ERRORS;
const WITHOUT_ERRORS_NAME = 'WITHOUT_ERRORS';
const errorsSetNames = new Set();
const errorMapNames = new Map();
// tslint:disable-next-line: prefer-const
let commonErrorsMessages = {};
const nextErrorNumber = (errorName, errorMessage = '') => {
    if (errorsSetNames.has(errorName)) {
        throw new Error(`The error name is repeated: ${errorName}`);
    }
    currentErrorNumber++;
    errorMapNames.set(currentErrorNumber, errorName);
    errorsSetNames.add(errorName);
    commonErrorsMessages[currentErrorNumber] = errorMessage;
    return currentErrorNumber;
};
exports.nextErrorNumber = nextErrorNumber;
const getErrorName = (errorCode) => {
    const errorName = errorMapNames.get(errorCode);
    return (errorName !== null && errorName !== undefined) ? errorName : 'unknown error';
};
exports.getErrorName = getErrorName;
const getErrorMessage = (appStatusCode) => {
    return commonErrorsMessages[appStatusCode];
};
exports.getErrorMessage = getErrorMessage;
const buildErrorDataContainer = (errorCode) => {
    const errorName = getErrorName(errorCode);
    const errorDataContainer = new CommonErrorDataContainer_1.CommonErrorDataContainer(errorCode, errorName);
    return errorDataContainer;
};
exports.buildErrorDataContainer = buildErrorDataContainer;
const commonErrorsCodes = {
    UNKNOWN_ERROR: nextErrorNumber('UNKNOWN_ERROR', 'Unknown error'),
    ERROR_IN_MIDDLEWARE: nextErrorNumber('ERROR_IN_MIDDLEWARE'),
    BAD_FORMAT_EMAIL: nextErrorNumber('BAD_FORMAT_EMAIL', 'This isn\'t a valid email'),
    EMAIL_IS_REQUIRED: nextErrorNumber('EMAIL_IS_REQUIRED', 'The email is required'),
    FAIL_TO_GET_RECORD: nextErrorNumber('FAIL_TO_GET_RECORD', 'Fail to get record'),
    FAIL_TO_INSERT_RECORD: nextErrorNumber('FAIL_TO_INSERT_RECORD'),
    FAIL_TO_UPDATE_RECORD: nextErrorNumber('FAIL_TO_UPDATE_RECORD'),
    FAIL_TO_DELETE_RECORD: nextErrorNumber('FAIL_TO_DELETE_RECORD'),
    FAIL_TO_COMPLETE_TRANSACTION: nextErrorNumber('FAIL_TO_COMPLETE_TRANSACTION'),
    PAGE_NOT_VALID_DATA_TYPE: nextErrorNumber('PAGE_NOT_VALID_DATA_TYPE'),
    LIMIT_NOT_VALID_DATA_TYPE: nextErrorNumber('LIMIT_NOT_VALID_DATA_TYPE'),
    NAME_IS_REQUIRED: nextErrorNumber('NAME_IS_REQUIRED', 'The name is required'),
};
exports.commonErrorsCodes = commonErrorsCodes;
errorMapNames.set(WITHOUT_ERRORS, WITHOUT_ERRORS_NAME);
errorsSetNames.add(WITHOUT_ERRORS_NAME);
//# sourceMappingURL=AppCommonErrorCodes.js.map