"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authErrosCodes = exports.commonErrorsCodes = exports.WITHOUT_ERRORS = exports.buildErrorDataContainer = exports.getErrorMessage = exports.getErrorName = exports.nextErrorNumber = exports.CommonErrorDataContainer = void 0;
const CommonErrorDataContainer_1 = require("./CommonErrorDataContainer");
Object.defineProperty(exports, "CommonErrorDataContainer", { enumerable: true, get: function () { return CommonErrorDataContainer_1.CommonErrorDataContainer; } });
const AppCommonErrorCodes_1 = require("./AppCommonErrorCodes");
Object.defineProperty(exports, "nextErrorNumber", { enumerable: true, get: function () { return AppCommonErrorCodes_1.nextErrorNumber; } });
Object.defineProperty(exports, "getErrorName", { enumerable: true, get: function () { return AppCommonErrorCodes_1.getErrorName; } });
Object.defineProperty(exports, "getErrorMessage", { enumerable: true, get: function () { return AppCommonErrorCodes_1.getErrorMessage; } });
Object.defineProperty(exports, "buildErrorDataContainer", { enumerable: true, get: function () { return AppCommonErrorCodes_1.buildErrorDataContainer; } });
Object.defineProperty(exports, "WITHOUT_ERRORS", { enumerable: true, get: function () { return AppCommonErrorCodes_1.WITHOUT_ERRORS; } });
Object.defineProperty(exports, "commonErrorsCodes", { enumerable: true, get: function () { return AppCommonErrorCodes_1.commonErrorsCodes; } });
const authErrorManager_1 = require("./authErrorManager");
Object.defineProperty(exports, "authErrosCodes", { enumerable: true, get: function () { return authErrorManager_1.authErrosCodes; } });
//# sourceMappingURL=index.js.map