"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// Helpers
const db_validators_1 = require("../../common/helpers/db-validators");
// Middlewares
const middlewares_1 = require("../../common/middlewares");
// Controllers
const contacts_controller_1 = require("./contacts.controller");
// Error Manager
const errorManager_1 = require("../../common/errorManager");
const contact_1 = require("../../db/models/contact");
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    req.model = {
        model: contact_1.Contact,
        modelName: 'contact',
    };
    next();
});
// Get all Contacts for a User
router.get('/', [
    middlewares_1.validateJWT,
    middlewares_1.validateInputs,
], contacts_controller_1.getContacts);
// Get a Contact by uid
router.get('/:id', [
    middlewares_1.validateJWT,
    (0, express_validator_1.check)('id').custom(db_validators_1.modelExistByIdAndUid),
    middlewares_1.validateInputs
], contacts_controller_1.getContactById);
// Create a Contact
router.post('/', [
    middlewares_1.validateJWT,
    (0, express_validator_1.check)('name', errorManager_1.commonErrorsCodes.NAME_IS_REQUIRED).not().isEmpty(),
    middlewares_1.validateInputs
], contacts_controller_1.createContact);
// Update a Contact
router.put('/:id', [
    middlewares_1.validateJWT,
    (0, express_validator_1.check)('id').custom(db_validators_1.modelExistByIdAndUid),
    middlewares_1.validateInputs
], contacts_controller_1.updateContact);
// Delete a Contact
router.delete('/:id', [
    middlewares_1.validateJWT,
    (0, express_validator_1.check)('id').custom(db_validators_1.modelExistByIdAndUid),
    middlewares_1.validateInputs
], contacts_controller_1.deleteContact);
exports.default = router;
//# sourceMappingURL=contacts.routes.js.map