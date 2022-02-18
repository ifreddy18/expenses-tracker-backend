"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputs = void 0;
const express_validator_1 = require("express-validator");
const validateInputs = (req, res, next) => {
    // Retener errores - express-validator
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports.validateInputs = validateInputs;
//# sourceMappingURL=validate-inputs.js.map