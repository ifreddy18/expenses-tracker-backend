import { Router } from 'express';
import { check } from 'express-validator';

// Helpers
import {
    userExistByUid,
    userExistWithEmail
} from '../../common/helpers/db-validators';

// Middlewares
import { validateInputs } from '../../common/middlewares/validate-inputs';

// Controllers
import {
    getUsers,
    getUserByUid,
    createUser,
    updateUser,
    deleteUser
} from './users.controller';

// Error Manager
import { authErrosCodes, commonErrorsCodes } from '../../common/errorManager';

const router = Router();

// Get all Users
router.get('/', getUsers );

// Get a User by uid
router.get('/:uid', [
    check('uid').custom( userExistByUid ),
    validateInputs
], getUserByUid );

// Create a User
router.post('/', [
    check('name', commonErrorsCodes.NAME_IS_REQUIRED).not().isEmpty(),
    check('password', authErrosCodes.AUTH_INVALID_PASSWORD).isLength({ min: 6 }),
    check('email', commonErrorsCodes.EMAIL_IS_REQUIRED).not().isEmpty(),
    check('email', commonErrorsCodes.BAD_FORMAT_EMAIL).isEmail(),
    check('email').custom( userExistWithEmail ),
    validateInputs
], createUser );

// Update a User
router.put('/:uid', [
    check('uid').custom( userExistByUid ),
    validateInputs
], updateUser );

// Delete a User
router.delete('/:uid', [
    check('uid').custom( userExistByUid ),
    validateInputs
], deleteUser );

export default router;