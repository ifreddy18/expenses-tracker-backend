import { Router } from 'express';
import { check } from 'express-validator';

// Helpers
import { modelExistByIdAndUid } from '../../common/helpers/db-validators';

// Middlewares
import { validateInputs, validateJWT } from '../../common/middlewares';

// Controllers
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from './categories.controller';

// Error Manager
import { commonErrorsCodes } from '../../common/errorManager';
import { Category } from '../../db/models/category';

const router = Router();

router.use((req, res, next) => {
    req.model = {
        model: Category,
        modelName: 'category',
    };
    next();
});

// Get all Category for a User
router.get('/', [
    validateJWT,
    validateInputs,
], getCategories );

// Get a Category by uid
router.get('/:id', [
    validateJWT,
    check('id').custom( modelExistByIdAndUid ),
    validateInputs
], getCategoryById );

// Create a Category
router.post('/', [
    validateJWT,
    check('name', commonErrorsCodes.NAME_IS_REQUIRED).not().isEmpty(),
    validateInputs
], createCategory );

// Update a Category
router.put('/:id', [
    validateJWT,
    check('id').custom( modelExistByIdAndUid ),
    validateInputs
], updateCategory );

// Delete a Category
router.delete('/:id', [
    validateJWT,
    check('id').custom( modelExistByIdAndUid ),
    validateInputs
], deleteCategory );

export default router;