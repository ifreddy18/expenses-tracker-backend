import { Router } from 'express';
import { check } from 'express-validator';

// Middlewares
import { validateInputs } from '../middlewares/validate-inputs';

// Controllers
import { login } from '../controllers/auth.controller';

const router = Router();

// Create a User
router.post('/login', [
    check('email', 'This isn\'t a valid email').isEmail(),
    check('email', 'The email is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    validateInputs
], login );

export default router;
