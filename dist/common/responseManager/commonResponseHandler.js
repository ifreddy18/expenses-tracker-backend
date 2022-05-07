"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = exports.CommonResponseBuilder = void 0;
const errorManager_1 = require("../errorManager");
const CommonResponseBuilder = (httpStatus, appStatusCode, errors = [], message) => {
    const appStatusName = (0, errorManager_1.getErrorName)(appStatusCode);
    const appStatusMessage = message || (0, errorManager_1.getErrorMessage)(appStatusCode) || '';
    const data = {
        httpStatus,
        appStatusCode,
        appStatusName,
        appStatusMessage,
        errors
    };
    return data;
};
exports.CommonResponseBuilder = CommonResponseBuilder;
const responseHandler = (res, responseData) => {
    const { httpStatus } = responseData, restResponseData = __rest(responseData, ["httpStatus"]);
    const body = Object.assign({}, restResponseData);
    res.status(httpStatus).json(body);
};
exports.responseHandler = responseHandler;
//# sourceMappingURL=commonResponseHandler.js.map