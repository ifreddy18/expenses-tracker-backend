import { Request, Response } from 'express';
import { Account, Bank } from '../../db/models';
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

export const getBanks = async (req: Request, res: Response): Promise<void> => {

    const { uid } = req.user;

	try {
		const accounts = await Account.findAll({ where: { status: 1 } });

		const banksRaw = await Bank.findAll({ where: { uid, status: 1 }});
		const banks = banksRaw.map(bank => ({
			id: bank.id,
			name: bank.name,
			accounts: accounts.filter(a => a.bankId === bank.id)
						.map(a => ({
							id: a.id,
							name: a.name,
							currencyCode: a.currencyCode,
							bankId: a.bankId,
						})),
		}));

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = banks;
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const getBankById = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	const { uid } = req.user;

	try {
		const bank = await Bank.findAll({ where: { id, uid, status: 1 }});

		if (!bank) {
			throw new ResponseError(400, commonErrorsCodes.FAIL_TO_GET_RECORD,
				`Doesn\'t exist a bank with id: ${id}`);
		}

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = bank;
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const createBank = async (req: Request, res: Response): Promise<void> => {

	const { name } = req.body;
    const { uid } = req.user;

	try {

		const bank = await Bank.create({ name , uid });

		if ( !bank ) throw new ResponseError(500, commonErrorsCodes.FAIL_TO_INSERT_RECORD);

		// // Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = bank;
		resData.appStatusMessage = 'Bank created successfully';
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const updateBank = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	const { uid } = req.user;
	const { name } = req.body;

	try {
		const bank = await Bank.findOne({ where: { id, uid, status: 1 }});

		// Validate if category exist
		if (!bank) throw new ResponseError(
			500,
			commonErrorsCodes.FAIL_TO_UPDATE_RECORD,
			`Invalid bank id: ${id}`
		);

		await bank.update({ name });

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.appStatusMessage = 'Bank updated successfully';
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const deleteBank = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;

	try {
		const bank = await Bank.findOne({ where: { id, status: 1 }});

		// Validate if bank exist
		if (!bank) throw new ResponseError(
			500,
			commonErrorsCodes.FAIL_TO_UPDATE_RECORD,
			`Invalid bank id: ${id}`
		);

		// TODO: Validate if exist a transaction with this bank or any acccount

		await bank.update({ status: 0 });
		await Account.update({ status: 0 }, { where: { bankId: id }});

		// // Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.appStatusMessage = 'Bank deleted successfully';
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const restoreBank = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;

	try {
		const bank = await Bank.findOne({ where: { id, status: 0 }});

		// Validate if category exist
		if (!bank) throw new ResponseError(
			500,
			commonErrorsCodes.FAIL_TO_UPDATE_RECORD,
			`Invalid deleted bank id: ${id}`
		);

		await bank.update({ status: 1 });
		await Account.update({ status: 1 }, { where: { bankId: id }});

		// // Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.appStatusMessage = 'Bank restored successfully';
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}
