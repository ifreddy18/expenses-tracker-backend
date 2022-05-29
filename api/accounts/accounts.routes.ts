import { Router } from 'express';
import { check } from 'express-validator';

// Helpers
import { modelExistById } from '../../common/helpers/db-validators';

// Middlewares
import { validateInputs, validateJWT } from '../../common/middlewares';

// Controllers
import {
    getAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount,
} from './accounts.controller';

// Error Manager
import { commonErrorsCodes } from '../../common/errorManager';
import { Account } from '../../db/models';

const router = Router();

router.use((req, res, next) => {
    req.model = {
        model: Account,
        modelName: 'account',
    };
    next();
});

// Get all Account for a User
router.get('/', [
    validateJWT,
    validateInputs,
], getAccounts );

// Get a Account by id
router.get('/:id', [
    validateJWT,
    check('id').custom( modelExistById ),
    validateInputs
], getAccountById );

// Create a Account
router.post('/', [
    validateJWT,
    check('name', commonErrorsCodes.NAME_IS_REQUIRED).not().isEmpty(),
    check('bankId', commonErrorsCodes.ATTRIBUTE_IS_REQUIRED).not().isEmpty(),
    check('currencyCode', commonErrorsCodes.ATTRIBUTE_IS_REQUIRED).not().isEmpty(),
    validateInputs
], createAccount );

// Update a Account
router.put('/:id', [
    validateJWT,
    check('id').custom( modelExistById ),
    validateInputs
], updateAccount );

// Delete a Account
router.delete('/:id', [
    validateJWT,
    check('id').custom( modelExistById ),
    validateInputs
], deleteAccount );

export default router;