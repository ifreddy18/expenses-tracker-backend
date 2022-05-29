import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../../db/models';
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

export const getUsers = async (req: Request, res: Response): Promise<void> => {

	try {
		const users = await User.findAll({ where: { status: 1 } });

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = users;
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const getUserByUid = async (req: Request, res: Response): Promise<void> => {

	const { uid } = req.params;

	try {
		// Search in DB
		const user = await User.findByPk(uid);

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = user;
		responseHandler(res, resData)

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const createUser = async (req: Request, res: Response): Promise<void> => {

	const { password, ...restUser } = req.body;

	try {
		// Encrypt password
		const salt = bcrypt.genSaltSync();
		const bcryptPassword = bcrypt.hashSync(password, salt);

		// Create and save
		const user = await User.create({
			...restUser,
			password: bcryptPassword
		});

		if ( !user ) throw new ResponseError(500, commonErrorsCodes.FAIL_TO_INSERT_RECORD);

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = { ...restUser };
		resData.appStatusMessage = 'User created successfully';
		responseHandler(res, resData)

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const updateUser = async (req: Request, res: Response): Promise<void> => {

	const { uid } = req.params;
	const { body } = req;

	try {
		const user = await User.findByPk(uid);

		if( !user ) throw new ResponseError(500, commonErrorsCodes.FAIL_TO_UPDATE_RECORD);

		await user.update(body, { where: { uid }});

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = {
			name: user?.name,
			email: user?.email,
		};
		resData.appStatusMessage = 'User updated successfully';
		responseHandler(res, resData)

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {

	const { uid } = req.params;

	try {
		const user = await User.findByPk(uid);

		// Logic delete
		if ( !user ) throw new ResponseError(500, commonErrorsCodes.FAIL_TO_DELETE_RECORD);

		await user.update({ status: 0 });

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = {
			name: user?.name,
			email: user?.email,
		};
		resData.appStatusMessage = 'User deleted successfully';
		responseHandler(res, resData)

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}
