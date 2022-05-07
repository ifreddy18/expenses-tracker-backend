"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchErrorResponse = void 0;
const classes_1 = require("../../classes");
const responseManager_1 = require("../responseManager");
const catchErrorResponse = (res, error, defaultValues) => {
    const isResponseError = error instanceof classes_1.ResponseError;
    const httpStatus = isResponseError ? error.httpStatus : defaultValues.httpStatus;
    const errorCode = isResponseError ? error.errorCode : defaultValues.errorCode;
    const errors = isResponseError ? [] : [error];
    const responseData = (0, responseManager_1.CommonResponseBuilder)(httpStatus, errorCode, errors);
    (0, responseManager_1.responseHandler)(res, responseData);
};
exports.catchErrorResponse = catchErrorResponse;
//# sourceMappingURL=catchErrorResponse.js.map