import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { User } from '../../db/models';
import { generateJWT } from '../../common/helpers/generate-jwt';
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
	authErrosCodes
} from '../../common/errorManager';
import { ResponseError } from '../../classes';

export const login = async( req: Request, res: Response ): Promise<void> => {

    const { email, password } = req.body

	try {
		// Verify if user exist by email
		const user = await User.findOne({ where: { email } });

		if ( !user || user.status === 0) {
			throw new ResponseError(400, authErrosCodes.AUTH_NOT_VALID_CREDENTIALS);
		}

		// Verify password
		const validPassword = bcrypt.compareSync(password, user.password);
		if ( !validPassword ) {
            throw new ResponseError(400, authErrosCodes.AUTH_NOT_VALID_CREDENTIALS);
		}

		// Generar el JWT
		const token = await generateJWT({
            uid: user.uid,
        });

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = { user, token };
		responseHandler(res, resData);

	} catch(error) {
		console.log(error);
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}
};

export const getAuthState = async(req: Request, res: Response): Promise<void> => {
	const { uid, email, name } = req.user;
	// Response
	const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
	resData.data = { uid, email, name };
	responseHandler(res, resData);
};