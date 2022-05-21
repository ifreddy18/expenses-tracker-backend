import { Router } from 'express';
import { check } from 'express-validator';
import { authErrosCodes, commonErrorsCodes } from '../../common/errorManager';

// Middlewares
import {
    validateJWT,
    validateInputs
} from '../../common/middlewares';

// Controllers
import { getAuthState, login } from './auth.controller';

const router = Router();

// Login a User
router.post('/login', [
    check('email', commonErrorsCodes.EMAIL_IS_REQUIRED).not().isEmpty(),
    check('email', commonErrorsCodes.BAD_FORMAT_EMAIL).isEmail(),
    check('password', authErrosCodes.AUTH_PASSWORD_REQUIRED).not().isEmpty(),
    validateInputs
], login );

// Login a User
router.get('/auth-state', [
    validateJWT,
    validateInputs
], getAuthState );

export default router;
