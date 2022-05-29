import { Request, Response } from 'express';
import { Contact } from '../../db/models';
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

export const getContacts = async (req: Request, res: Response): Promise<void> => {

    const { uid } = req.user;

	try {
		const contacts = await Contact.findAll({ where: { uid } });

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = contacts;
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const getContactById = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	const { uid } = req.user;

	try {
		const contact = await Contact.findOne({ where: { id, uid }});

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = contact;
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const createContact = async (req: Request, res: Response): Promise<void> => {

	const { name, contactType } = req.body;
    const { uid } = req.user;

	try {
		// Create and save
		const contact = await Contact.create({
			name,
			uid,
			contact_type_id: contactType
		});

		if ( !contact ) throw new ResponseError(500, commonErrorsCodes.FAIL_TO_INSERT_RECORD);

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = contact;
		resData.appStatusMessage = 'Contact created successfully';
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const updateContact = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	const { name } = req.body;

	try {
		const contact = await Contact.findByPk(id);

		// Update contact
		if (!contact) throw new ResponseError(500, commonErrorsCodes.FAIL_TO_UPDATE_RECORD);

		await contact.update({ name });

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.appStatusMessage = 'Contact updated successfully';
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const deleteContact = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;

	try {
		const contact = await Contact.findByPk(id);

		// Borrado fisico
		if ( !contact ) throw new ResponseError(500, commonErrorsCodes.FAIL_TO_DELETE_RECORD);

		await contact.update({ status: 0 });

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.appStatusMessage = 'Contact deleted successfully';
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}
