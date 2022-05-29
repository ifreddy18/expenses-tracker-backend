import { Router } from 'express';
import { check } from 'express-validator';

// Helpers
import { modelExistByIdAndUid } from '../../common/helpers/db-validators';

// Middlewares
import { validateInputs, validateJWT } from '../../common/middlewares';

// Controllers
import {
    getBanks,
    getBankById,
    createBank,
    updateBank,
    deleteBank,
} from './banks.controller';

// Error Manager
import { commonErrorsCodes } from '../../common/errorManager';
import { Bank } from '../../db/models';

const router = Router();

router.use((req, res, next) => {
    req.model = {
        model: Bank,
        modelName: 'bank',
    };
    next();
});

// Get all Account for a User
router.get('/', [
    validateJWT,
    validateInputs,
], getBanks );

// Get a Account by uid
router.get('/:id', [
    validateJWT,
    check('id').custom( modelExistByIdAndUid ),
    validateInputs
], getBankById );

// Create a Account
router.post('/', [
    validateJWT,
    check('name', commonErrorsCodes.NAME_IS_REQUIRED).not().isEmpty(),
    validateInputs
], createBank );

// Update a Account
router.put('/:id', [
    validateJWT,
    check('id').custom( modelExistByIdAndUid ),
    check('name', commonErrorsCodes.NAME_IS_REQUIRED).not().isEmpty(),
    validateInputs
], updateBank );

// Delete a Account
router.delete('/:id', [
    validateJWT,
    check('id').custom( modelExistByIdAndUid ),
    validateInputs
], deleteBank );

export default router;