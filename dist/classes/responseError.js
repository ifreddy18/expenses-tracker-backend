"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = void 0;
class ResponseError extends Error {
    constructor(httpStatus, errorCode) {
        super();
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
    }
}
exports.ResponseError = ResponseError;
//# sourceMappingURL=responseError.js.map