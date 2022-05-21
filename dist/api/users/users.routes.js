"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// Helpers
const db_validators_1 = require("../../common/helpers/db-validators");
// Middlewares
const validate_inputs_1 = require("../../common/middlewares/validate-inputs");
// Controllers
const users_controller_1 = require("./users.controller");
// Error Manager
const errorManager_1 = require("../../common/errorManager");
const router = (0, express_1.Router)();
// Get all Users
router.get('/', users_controller_1.getUsers);
// Get a User by uid
router.get('/:uid', [
    (0, express_validator_1.check)('uid').custom(db_validators_1.userExistByUid),
    validate_inputs_1.validateInputs
], users_controller_1.getUserByUid);
// Create a User
router.post('/', [
    (0, express_validator_1.check)('name', errorManager_1.commonErrorsCodes.NAME_IS_REQUIRED).not().isEmpty(),
    (0, express_validator_1.check)('password', errorManager_1.authErrosCodes.AUTH_INVALID_PASSWORD).isLength({ min: 6 }),
    (0, express_validator_1.check)('email', errorManager_1.commonErrorsCodes.EMAIL_IS_REQUIRED).not().isEmpty(),
    (0, express_validator_1.check)('email', errorManager_1.commonErrorsCodes.BAD_FORMAT_EMAIL).isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.userExistWithEmail),
    validate_inputs_1.validateInputs
], users_controller_1.createUser);
// Update a User
router.put('/:uid', [
    (0, express_validator_1.check)('uid').custom(db_validators_1.userExistByUid),
    validate_inputs_1.validateInputs
], users_controller_1.updateUser);
// Delete a User
router.delete('/:uid', [
    (0, express_validator_1.check)('uid').custom(db_validators_1.userExistByUid),
    validate_inputs_1.validateInputs
], users_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.routes.js.map