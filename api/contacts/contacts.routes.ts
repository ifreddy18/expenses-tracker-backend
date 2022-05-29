import { Router } from 'express';
import { check } from 'express-validator';

// Helpers
import { modelExistByIdAndUid } from '../../common/helpers/db-validators';

// Middlewares
import { validateInputs, validateJWT } from '../../common/middlewares';

// Controllers
import {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
} from './contacts.controller';

// Error Manager
import { commonErrorsCodes } from '../../common/errorManager';
import { Contact } from '../../db/models/contact';

const router = Router();

router.use((req, res, next) => {
    req.model = {
        model: Contact,
        modelName: 'contact',
    };
    next();
});

// Get all Contacts for a User
router.get('/', [
    validateJWT,
    validateInputs,
], getContacts );

// Get a Contact by uid
router.get('/:id', [
    validateJWT,
    check('id').custom( modelExistByIdAndUid ),
    validateInputs
], getContactById );

// Create a Contact
router.post('/', [
    validateJWT,
    check('name', commonErrorsCodes.NAME_IS_REQUIRED).not().isEmpty(),
    validateInputs
], createContact );

// Update a Contact
router.put('/:id', [
    validateJWT,
    check('id').custom( modelExistByIdAndUid ),
    validateInputs
], updateContact );

// Delete a Contact
router.delete('/:id', [
    validateJWT,
    check('id').custom( modelExistByIdAndUid ),
    validateInputs
], deleteContact );

export default router;