import { Router } from 'express';
import { check } from 'express-validator';

// Helpers
import { contactExistByIdAndUid } from '../../common/helpers/db-validators';

// Middlewares
import { validateInputs, validateJWT } from '../../common/middlewares';

// Paths
import { paths } from '../routerPaths';

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

const router = Router();

// Get all Contacts for a User
router.get( paths.contacts + '/', [
    validateJWT,
    validateInputs,
], getContacts );

// Get a Contact by uid
router.get( paths.contacts + '/:id', [
    validateJWT,
    check('id').custom( contactExistByIdAndUid ),
    validateInputs
], getContactById );

// Create a Contact
router.post( paths.contacts + '/', [
    validateJWT,
    check('name', commonErrorsCodes.NAME_IS_REQUIRED).not().isEmpty(),
    validateInputs
], createContact );

// Update a Contact
router.put( paths.contacts + '/:id', [
    validateJWT,
    check('id').custom( contactExistByIdAndUid ),
    validateInputs
], updateContact );

// Delete a Contact
router.delete( paths.contacts + '/:id', [
    validateJWT,
    check('id').custom( contactExistByIdAndUid ),
    validateInputs
], deleteContact );

export default router;