"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputs = void 0;
const express_validator_1 = require("express-validator");
const errorManager_1 = require("../errorManager");
const responseManager_1 = require("../responseManager");
const validateInputs = (req, res, next) => {
    // Retener errores - express-validator
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const { msg } = (errors.array({ onlyFirstError: true }))[0];
        try {
            const responseData = (0, responseManager_1.CommonResponseBuilder)(builtHttpCode(errorManager_1.commonErrorsCodes.ERROR_IN_MIDDLEWARE), errorManager_1.commonErrorsCodes.ERROR_IN_MIDDLEWARE, errors.array(), msg);
            (0, responseManager_1.responseHandler)(res, responseData);
        }
        catch (error) {
            console.log({ error });
            const responseData = (0, responseManager_1.CommonResponseBuilder)(500, errorManager_1.commonErrorsCodes.UNKNOWN_ERROR, errors.array());
            (0, responseManager_1.responseHandler)(res, responseData);
        }
        return;
    }
    next();
};
exports.validateInputs = validateInputs;
const builtHttpCode = (appStatus) => {
    return (appStatus === Number(errorManager_1.authErrosCodes.AUTH_MISSING_TOKEN)
        || appStatus === Number(errorManager_1.authErrosCodes.AUTH_NOT_VALID_TOKEN)) ? 401 : 400;
};
//# sourceMappingURL=validate-inputs.js.map