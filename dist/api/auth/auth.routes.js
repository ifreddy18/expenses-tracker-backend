"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const errorManager_1 = require("../../common/errorManager");
// Middlewares
const middlewares_1 = require("../../common/middlewares");
// Paths
const routerPaths_1 = require("../routerPaths");
// Controllers
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
// Login a User
router.post(routerPaths_1.paths.auth + '/login', [
    (0, express_validator_1.check)('email', errorManager_1.commonErrorsCodes.EMAIL_IS_REQUIRED).not().isEmpty(),
    (0, express_validator_1.check)('email', errorManager_1.commonErrorsCodes.BAD_FORMAT_EMAIL).isEmail(),
    (0, express_validator_1.check)('password', errorManager_1.authErrosCodes.AUTH_PASSWORD_REQUIRED).not().isEmpty(),
    middlewares_1.validateInputs
], auth_controller_1.login);
// Login a User
router.get(routerPaths_1.paths.auth + '/auth-state', [
    middlewares_1.validateJWT,
    middlewares_1.validateInputs
], auth_controller_1.getAuthState);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map