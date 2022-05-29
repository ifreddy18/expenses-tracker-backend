import { CommonErrorDataContainer } from './CommonErrorDataContainer';

let currentErrorNumber: number = 1000;
const WITHOUT_ERRORS = 0;
const WITHOUT_ERRORS_NAME = 'WITHOUT_ERRORS';
const errorsSetNames = new Set<string>();
const errorMapNames = new Map<number, string>();

// tslint:disable-next-line: prefer-const
let commonErrorsMessages: any = {};

const nextErrorNumber = (errorName: string, errorMessage: string = '') : number =>{

    if(errorsSetNames.has(errorName)) {
        throw new Error(`The error name is repeated: ${errorName}`);
    }
    currentErrorNumber++;
    errorMapNames.set(currentErrorNumber, errorName);
    errorsSetNames.add(errorName);
    commonErrorsMessages[currentErrorNumber] = errorMessage;
    return currentErrorNumber;
};

const getErrorName = (errorCode: number) : string => {
    const errorName = errorMapNames.get(errorCode);
    return (errorName !== null && errorName !== undefined) ? errorName : 'unknown error';
}

const getErrorMessage = (appStatusCode: number) : string | undefined => {
    return commonErrorsMessages[appStatusCode];
}

const buildErrorDataContainer = (errorCode: number) : CommonErrorDataContainer => {
    const errorName = getErrorName(errorCode);
    const errorDataContainer = new CommonErrorDataContainer(errorCode, errorName);
    return errorDataContainer;
}

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
    ATTRIBUTE_IS_REQUIRED: nextErrorNumber('ATTRIBUTE_IS_REQUIRED'),
};

errorMapNames.set(WITHOUT_ERRORS, WITHOUT_ERRORS_NAME);
errorsSetNames.add(WITHOUT_ERRORS_NAME);

export {
    nextErrorNumber,
    getErrorName,
    getErrorMessage,
    buildErrorDataContainer,
    WITHOUT_ERRORS,
    commonErrorsCodes,
}