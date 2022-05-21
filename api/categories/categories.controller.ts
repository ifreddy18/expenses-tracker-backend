import { Request, Response } from 'express';
import { Category } from '../../db/models';
// Response Manager
import {
	catchErrorResponse,
	CommonResponseBuilder,
	responseHandler
} from '../../common/responseManager';
// Error handler
import {
	WITHOUT_ERRORS,
	commonErrorsCodes,
} from '../../common/errorManager';
import { ResponseError } from '../../classes';
import { isEmptyObject } from '../../common/helpers/custom-validators';

export const getCategories = async (req: Request, res: Response): Promise<void> => {

    const { uid } = req.user;
	const { only_parents = false } = req.query;
	let data = [];

	try {

		const categoriesRaw = await Category.findAll({ where: { uid, status: 1 }});
		const categories = categoriesRaw.map(cateogry => ({
			id: cateogry.id,
			name: cateogry.name,
			level: cateogry.level,
			parentId: cateogry.parentId,
		}));

		for(const category of categories) {
			const parent = categories.find(c => c.id === category.parentId);
			const childrens = categories.filter(c => c.parentId === category.id);
			data.push({
				id: category.id,
				name: category.name,
				level: category.level,
				parent: parent || null,
				childrens,
			});
		}

		// Si solo se solicitan las categorias padres
		if(only_parents) {
			data = data.filter(c => c.level === 1);
		}

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = data;
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	const { uid } = req.user;

	try {
		const categoriesRaw = await Category.findAll({ where: { uid, status: 1 }});
		const categories = categoriesRaw.map(cateogry => ({
			id: cateogry.id,
			name: cateogry.name,
			level: cateogry.level,
			parentId: cateogry.parentId,
		}));

		const category = categories.find(c => c.id === Number(id));

		if (!category) {
			throw new ResponseError(400, commonErrorsCodes.FAIL_TO_GET_RECORD,
				`Doesn\'t exist a category with id: ${id}`);
		}

		const resCategory = {
			id: category.id,
			name: category.name,
			level: category.level,
			parent: categories.find(c => c.id === category.parentId) || null,
			childrens: categories.filter(c => c.parentId === category.id),
		};

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = resCategory;
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const createCategory = async (req: Request, res: Response): Promise<void> => {

	const { name, parentId } = req.body;
    const { uid } = req.user;

	try {
		// Validate if exist a parent Category
		let parentCategory = null;

		if (parentId) {
			parentCategory = await Category.findOne({ where: { id: parentId, uid }});
			if (!parentCategory) {
				throw new ResponseError(400, commonErrorsCodes.FAIL_TO_GET_RECORD,
					'The parent category does not exist');
			}
		};

		const categoryAttributes = {
			name,
			uid,
			level: parentCategory ? parentCategory.level + 1 : 1,
			parentId: parentCategory ? parentCategory.id : null,
		}

		console.log({categoryAttributes});

		const category = await Category.create(categoryAttributes);

		if ( !category ) throw new ResponseError(500, commonErrorsCodes.FAIL_TO_INSERT_RECORD);

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = {
			id: category.id,
			uid: category.uid,
			name: category.name,
			level: category.level,
			parentId: category.parentId,
		};
		resData.appStatusMessage = 'Category created successfully';
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const updateCategory = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	const { uid } = req.user;
	const { name, parentId } = req.body;
	const data: any = {};

	try {
		const category = await Category.findOne({ where: { id, uid, status: 1 }});

		// Validate if category exist
		if (!category) throw new ResponseError(
			500,
			commonErrorsCodes.FAIL_TO_UPDATE_RECORD,
			`Invalid category id: ${id}`
		);

		// Validate parentId
		if (parentId) {
			const parentCategory = await Category.findOne({
				where: { id: parentId, uid, level: 1, status: 1 }});
			if (!parentCategory) {
				throw new ResponseError(
					400,
					commonErrorsCodes.FAIL_TO_UPDATE_RECORD,
					`Invalid parentId or category is not level 1`
				);
			}
			data.parentId = parentId;
		}

		// Validate name
		if (name) data.name = name;

		// Validate if exist data to update
		if (isEmptyObject(data)) throw new ResponseError(
			400,
			commonErrorsCodes.FAIL_TO_UPDATE_RECORD,
			'No data to update'
		);


		await category.update(data);

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.appStatusMessage = 'Category updated successfully';
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;

	try {
		const category = await Category.findOne({ where: { id, status: 1}});

		// Borrado fisico
		if ( !category ) throw new ResponseError(400, commonErrorsCodes.FAIL_TO_DELETE_RECORD);

		await category.update({ status: 0 });
		await Category.update({ status: 0 }, { where: { parentId: id }});

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.appStatusMessage = 'Category deleted successfully';
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}
