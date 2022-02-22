import { Router } from 'express';
import { body, check } from 'express-validator';

// Helpers
import { contactExistByIdAndUid } from '../helpers/db-validators';

// Middlewares
import { validateInputs, validateJWT } from '../middlewares';

// Controllers
import {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
} from '../controllers/contacts.controller';

const router = Router();

// Get all Contacts for a User
router.get('/', [
    validateJWT,
    validateInputs,
], getContacts );

// Get a Contact by uid
router.get('/:id', [
    validateJWT,
    check('id').custom( contactExistByIdAndUid ),
    validateInputs
], getContactById );

// Create a Contact
router.post('/', [
    validateJWT,
    check('name', 'The name is obligatory').not().isEmpty(),
    validateInputs
], createContact );

// Update a Contact
router.put('/:id', [
    validateJWT,
    check('id').custom( contactExistByIdAndUid ),
    validateInputs
], updateContact );

// Delete a Contact
router.delete('/:id', [
    validateJWT,
    check('id').custom( contactExistByIdAndUid ),
    validateInputs
], deleteContact );

export default router;